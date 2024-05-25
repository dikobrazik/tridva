import {City, PickupPoint} from '@/types/geo';
import axios from 'axios';

type GetCityPickupPointsPayload = {
    cityId: number;
};

export const getCities = (): Promise<City[]> => axios.get(`geo/cities`).then(response => response.data);

export const getCityPickupPoints = (payload: GetCityPickupPointsPayload): Promise<PickupPoint[]> =>
    axios.get(`geo/cities/${payload.cityId}/pickup-points`).then(response => response.data);
