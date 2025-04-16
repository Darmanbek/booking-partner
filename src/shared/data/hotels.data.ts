export const hotels = [
	{
		id: 1,
		name: {
			ru: "Гранд Отель",
			en: "Grand Hotel",
			uz: "Grand Mehmonxonasi",
			kk: "Grand Қонақ үйі"
		},
		slug: "grand-hotel",
		description: {
			ru: "Роскошный отель в центре города с великолепным видом на город",
			en: "Luxury hotel in the city center with magnificent city views",
			uz: "Shahar markazida joylashgan hashamatli mehmonxona",
			kk: "Қала орталығындағы салтанатты қонақ үй"
		},
		category: {
			ru: "Отель",
			en: "Hotel"
		},
		rating: 4,
		images: [
			{
				hotel_id: 1,
				id: 8,
				image: "https://via.placeholder.com/300x200?text=Hotel+1",
				position: 1
			}
		],
		min_price: 150000,
		guests: 2,
		location: {
			address: "ул. Центральная, 1",
			coordinates: {
				latitude: 55.7558,
				longitude: 37.6173
			},
			city: "Ташкент",
			city_slug: "tashkent",
			distance_to_center: 3
		},
		hotel_info: {
			first_phone_number: "998991234567",
			site_url: "https://www.grandhotel.com",
			id: 1,
			second_phone_number: "998991112233",
			email: "info@grandhotel.com",
			hotel_id: 1
		}
	},
	{
		id: 2,
		name: {
			ru: "Санрайз Инн",
			en: "Sunrise Inn",
			uz: "Quyoshli Mehmonxona",
			kk: "Күннің Қонақ үйі"
		},
		slug: "sunrise-inn",
		description: {
			ru: "Уютный отель рядом с парком",
			en: "Cozy hotel near the park",
			uz: "Bog‘ yaqinidagi shinam mehmonxona",
			kk: "Саябақ жанындағы жайлы қонақ үй"
		},
		category: {
			ru: "Отель",
			en: "Hotel"
		},
		rating: 3,
		images: [
			{
				hotel_id: 2,
				id: 9,
				image: "https://via.placeholder.com/300x200?text=Hotel+2",
				position: 1
			}
		],
		min_price: 95000,
		guests: 1,
		location: {
			address: "ул. Парковая, 10",
			coordinates: {
				latitude: 55.761,
				longitude: 37.62
			},
			city: "Самарканд",
			city_slug: "samarkand",
			distance_to_center: 2
		},
		hotel_info: {
			first_phone_number: "998990001122",
			site_url: "https://www.sunriseinn.com",
			id: 2,
			second_phone_number: "998990003344",
			email: "contact@sunriseinn.com",
			hotel_id: 2
		}
	},
	{
		id: 3,
		name: {
			ru: "Лагуна Резорт",
			en: "Laguna Resort",
			uz: "Laguna Dam olish maskani",
			kk: "Лагуна Демалыс орны"
		},
		slug: "laguna-resort",
		description: {
			ru: "Курорт с бассейном и видом на озеро",
			en: "Resort with a pool and lake view",
			uz: "Hovuz va ko‘l manzarasi bor dam olish maskani",
			kk: "Бассейн және көл көрінісі бар курорт"
		},
		category: {
			ru: "Курорт",
			en: "Resort"
		},
		rating: 5,
		images: [
			{
				hotel_id: 3,
				id: 10,
				image: "https://via.placeholder.com/300x200?text=Hotel+3",
				position: 1
			}
		],
		min_price: 200000,
		guests: 4,
		location: {
			address: "ул. Озёрная, 5",
			coordinates: {
				latitude: 55.7622,
				longitude: 37.6261
			},
			city: "Бухара",
			city_slug: "bukhara",
			distance_to_center: 5
		},
		hotel_info: {
			first_phone_number: "998998765432",
			site_url: "https://www.lagunaresort.com",
			id: 3,
			second_phone_number: "998997654321",
			email: "info@lagunaresort.com",
			hotel_id: 3
		}
	}
]
