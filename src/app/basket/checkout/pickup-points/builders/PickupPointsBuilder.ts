import {PickupPoint} from '@/types/geo';
import {Feature} from 'ol';
import {Circle} from 'ol/geom';
import {fromLonLat} from 'ol/proj';

export class PickupPointsBuilder {
    public static build(pickupPoints: PickupPoint[]) {
        return pickupPoints.map(pickupPoint => {
            const circleGeometry = new Circle(
                fromLonLat([Number(pickupPoint.longitude), Number(pickupPoint.latitude)]),
                20,
            );

            const circleFeature = new Feature({
                geometry: circleGeometry,
                pickupPoint,
            });

            circleFeature.setId(pickupPoint.id);

            return circleFeature;
        });
    }
}
