import {asColorLike} from 'ol/colorlike';
import {Style, Fill, Stroke, Circle, Text} from 'ol/style';
import {StyleFunction} from 'ol/style/Style';

const mainColor = asColorLike('#ff0000');
const selectedColor = asColorLike('rgba(185,0,0,1)');

export const getPickupPointCircleStyle = (size: number, isSelected: boolean = false) => {
    const fillColor = isSelected ? selectedColor : mainColor;

    return [
        new Style({
            image: new Circle({
                radius: 10,
                fill: new Fill({
                    color: fillColor,
                }),
            }),
        }),
        new Style({
            image: new Circle({
                radius: 8,
                stroke: new Stroke({
                    color: 'white',
                    width: 2,
                }),
                fill: new Fill({
                    color: fillColor,
                }),
            }),
            ...(size > 1
                ? {
                      text: new Text({
                          text: size.toString(),
                          fill: new Fill({
                              color: '#fff',
                          }),
                      }),
                  }
                : undefined),
        }),
    ];
};

export const selectedPickupPointStyle = getPickupPointCircleStyle(1, true);

export const clusterStyleFunction: StyleFunction = function (feature) {
    const size = feature.get('features').length; // Количество точек в кластере

    return getPickupPointCircleStyle(size);
};
