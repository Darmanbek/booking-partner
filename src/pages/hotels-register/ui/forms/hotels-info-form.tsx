import { AimOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import { useNavigate, useParams } from "@tanstack/react-router"
import { Button, Card, Col, Form, Input, Row, Select } from "antd"
import { type LatLng } from "leaflet"
import { type FC, useEffect, useRef, useState } from "react"
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet"
import {
	useHotelsRegister,
	useReverseGeocode
} from "src/pages/hotels-register/hooks"
import { useGetCategoriesQuery } from "src/services/categories"
import { type HotelChange, useGetHotelsBySlugQuery } from "src/services/hotels"
import { useGetLocationsQuery } from "src/services/locations"
import { useTranslation } from "src/shared/hooks"
import { Map, type MapRef, RedMarker } from "src/widgets/map"

const CenterMarker = () => {
	const map = useMap()
	const { form } = useHotelsRegister()
	const [center, setCenter] = useState(() => map.getCenter())
	const [meCenter, setMeCenter] = useState<Pick<LatLng, "lng" | "lat"> | null>(
		null
	)
	const { hotelSlug } = useParams({ strict: false })
	const { data: hotel } = useGetHotelsBySlugQuery(hotelSlug)
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
		if (!hotelSlug) return
		if (
			hotel &&
			hotel?.data?.location?.coordinates?.latitude &&
			hotel?.data?.location?.coordinates?.longitude
		) {
			map.setView({
				lat: hotel?.data?.location?.coordinates?.latitude,
				lng: hotel?.data?.location?.coordinates?.longitude
			})
		}
	}, [hotel, hotelSlug, map])

	useEffect(() => {
		if (hotelSlug) {
			if (
				hotel?.data?.location.coordinates?.latitude !== center?.lat ||
				hotel?.data?.location?.coordinates?.longitude !== center?.lng
			) {
				form.setFieldValue("address", address)
				return
			}
		} else {
			form.setFieldValue("address", address)
		}
	}, [
		address,
		center?.lat,
		center?.lng,
		form,
		hotel?.data?.location.coordinates?.latitude,
		hotel?.data?.location.coordinates?.longitude,
		hotelSlug
	])

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
				<RedMarker position={meCenter}>
					<Popup>{`Ваше местоположение`}</Popup>
				</RedMarker>
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
		useGetLocationsQuery({
			page_size: 1000
		})

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
