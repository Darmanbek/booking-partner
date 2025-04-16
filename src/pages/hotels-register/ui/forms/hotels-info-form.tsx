import { AimOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import { useNavigate } from "@tanstack/react-router"
import { Button, Card, Col, Form, Input, Row, Select } from "antd"
import axios from "axios"
import L, { type LatLng } from "leaflet"
import { type FC, useEffect, useRef, useState } from "react"
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet"
import { useHotelsRegister } from "src/pages/hotels-register/hooks"
import { useGetCategoriesQuery } from "src/services/categories/categories.api"
import type { HotelChange } from "src/services/hotels"
import { useGetLocationsQuery } from "src/services/locations"
import { useTranslation } from "src/shared/hooks"
import { Map, type MapRef } from "src/widgets/map"

function useReverseGeocode(lat: number, lon: number, delay = 500) {
	const [address, setAddress] = useState("")
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			const fetchAddress = async () => {
				try {
					setLoading(true)
					const res = await axios.get(
						`https://nominatim.openstreetmap.org/reverse`,
						{
							params: {
								format: "jsonv2",
								lat,
								lon
							}
						}
					)
					const data = await res.data
					console.log(data)
					setAddress(data.display_name)
				} catch (err) {
					console.error("Ошибка геокодинга:", err)
				} finally {
					setLoading(false)
				}
			}

			fetchAddress()
		}, delay)

		return () => clearTimeout(timeoutId) // очистка при изменении координат
	}, [lat, lon, delay])

	return { address, loading }
}

const CenterMarker = () => {
	const map = useMap()
	const { form } = useHotelsRegister()
	const [center, setCenter] = useState(() => map.getCenter())
	const [meCenter, setMeCenter] = useState<Pick<LatLng, "lng" | "lat"> | null>(
		null
	)
	const { address } = useReverseGeocode(center.lat, center.lng)

	useMapEvents({
		move: (event) => {
			const center = event.target.getCenter() as LatLng
			setCenter(center)
			form.setFieldsValue({
				latitude: center.lat,
				longitude: center.lng
			})
		}
	})

	useEffect(() => {
		form.setFieldValue("address", address)
	}, [address, form])

	useEffect(() => {
		if (navigator?.geolocation) {
			navigator?.geolocation?.getCurrentPosition((position) => {
				setMeCenter({
					lng: position?.coords?.longitude,
					lat: position?.coords?.latitude
				})
			})
		}
	}, [])
	return (
		<>
			<Marker position={center}>
				<Popup>{`${Number(center.lat).toFixed(6)}, ${Number(center.lng).toFixed(6)}`}</Popup>
			</Marker>
			{meCenter && (
				<Marker
					position={meCenter}
					icon={
						new L.Icon({
							iconUrl: "/map/marker-icon-red.png",
							shadowUrl: "/map/marker-shadow.png",
							iconSize: [25, 41],
							iconAnchor: [12, 41],
							popupAnchor: [1, -34],
							shadowSize: [41, 41]
						})
					}
				>
					<Popup>{`Ваше местоположение`}</Popup>
				</Marker>
			)}
		</>
	)
}

const HotelsInfoForm: FC = () => {
	const { form, onFinish } = useHotelsRegister()
	const mapRef = useRef<MapRef>(null)
	const navigate = useNavigate()
	const { t } = useTranslation()

	const { data: locationCities, isLoading: locationLoading } =
		useGetLocationsQuery()

	const { data: categories, isLoading: categoriesLoading } =
		useGetCategoriesQuery()

	const onFindMe = async () => {
		if (mapRef.current && navigator?.geolocation) {
			navigator?.geolocation?.getCurrentPosition(async (position) => {
				if (mapRef?.current) {
					mapRef?.current?.setView({
						lng: position?.coords?.longitude,
						lat: position?.coords?.latitude
					})
				}
			})
		}
	}

	useEffect(() => {
		if (mapRef.current && navigator?.geolocation) {
			navigator?.geolocation?.getCurrentPosition((position) => {
				if (mapRef?.current) {
					mapRef?.current?.setView({
						lng: position?.coords?.longitude,
						lat: position?.coords?.latitude
					})
				}
			})
		}
	}, [])
	return (
		<Card
			title={"Об объекте"}
			extra={
				<Button
					type={"primary"}
					icon={<ArrowLeftOutlined />}
					onClick={() => navigate({ to: "/hotels" })}
				>
					Назад
				</Button>
			}
		>
			<Form
				name={"hotel-info-form"}
				form={form}
				requiredMark={false}
				autoComplete={"off"}
				layout={"vertical"}
				onFinish={onFinish}
			>
				<Row gutter={16} style={{ rowGap: 16 }}>
					<Col xs={24} md={12}>
						<Form.Item<HotelChange>
							label={"Название"}
							name={"name"}
							rules={[{ required: true }]}
						>
							<Input />
						</Form.Item>
						<Row gutter={16} style={{ rowGap: 16 }}>
							<Col xs={24} sm={12}>
								<Form.Item<HotelChange>
									label={"Город"}
									name={"city_id"}
									rules={[{ required: true }]}
								>
									<Select
										options={locationCities?.data?.map((item) => ({
											value: item.id,
											label: item.name
										}))}
										loading={locationLoading}
										disabled={locationLoading}
										showSearch={true}
										optionFilterProp={"label"}
									/>
								</Form.Item>
							</Col>
							<Col xs={24} sm={12}>
								<Form.Item<HotelChange>
									label={"Категория"}
									name={"hotel_category_id"}
									rules={[{ required: true }]}
								>
									<Select
										options={categories?.data?.map((item) => ({
											value: item.id,
											label: t(item.name)
										}))}
										loading={categoriesLoading}
										disabled={categoriesLoading}
										showSearch={true}
										optionFilterProp={"label"}
									/>
								</Form.Item>
							</Col>
						</Row>
						<Form.Item<HotelChange>
							label={"Адрес"}
							name={"address"}
							rules={[{ required: true }]}
						>
							<Input.TextArea />
						</Form.Item>
						<Form.Item<HotelChange>
							label={"Описание"}
							name={"description"}
							rules={[{ required: true }]}
						>
							<Input.TextArea />
						</Form.Item>
					</Col>
					<Col xs={24} md={12}>
						<Form.Item<HotelChange> name={"latitude"} hidden={true}>
							<Input />
						</Form.Item>
						<Form.Item<HotelChange> name={"longitude"} hidden={true}>
							<Input />
						</Form.Item>
						<div style={{ position: "relative" }}>
							<Button
								style={{
									position: "absolute",
									top: 10,
									right: 10,
									zIndex: 500
								}}
								onClick={onFindMe}
								icon={<AimOutlined />}
							/>
							<Map ref={mapRef}>
								<CenterMarker />
							</Map>
						</div>
					</Col>
				</Row>
			</Form>
		</Card>
	)
}

export { HotelsInfoForm }
