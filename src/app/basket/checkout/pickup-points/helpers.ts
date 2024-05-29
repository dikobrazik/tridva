import {Coordinate} from 'ol/coordinate';
import Style from 'ol/style/Style';

export const pickupPointCircleStyle = new Style({
    renderer(coordinates, state) {
        const [[x, y], [x1, y1]] = coordinates as Coordinate[];
        const ctx = state.context;
        const dx = x1 - x;
        const dy = y1 - y;
        const radius = Math.sqrt(dx * dx + dy * dy);

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
        ctx.fillStyle = 'rgba(255,0,0,1)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, radius * 0.9, 0, 2 * Math.PI, true);
        ctx.arc(x, y, radius * 0.8, 0, 2 * Math.PI, true);
        ctx.fillStyle = 'rgba(255,255,255,1)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, radius * 0.7, 0, 2 * Math.PI, true);
        ctx.arc(x, y, radius * 0.6, 0, 2 * Math.PI, true);
        ctx.fillStyle = 'rgba(255,0,0,1)';
        ctx.fill();
    },
});

export const pickupPointCircleSelectStyle = new Style({
    renderer(coordinates, state) {
        const [[x, y], [x1, y1]] = coordinates as Coordinate[];
        const ctx = state.context;
        const dx = x1 - x;
        const dy = y1 - y;
        const radius = Math.sqrt(dx * dx + dy * dy);

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
        ctx.fillStyle = 'rgba(185,0,0,1)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, radius * 0.9, 0, 2 * Math.PI, true);
        ctx.arc(x, y, radius * 0.8, 0, 2 * Math.PI, true);
        ctx.fillStyle = 'rgba(255,255,255,1)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, radius * 0.7, 0, 2 * Math.PI, true);
        ctx.arc(x, y, radius * 0.6, 0, 2 * Math.PI, true);
        ctx.fillStyle = 'rgba(185,0,0,1)';
        ctx.fill();
    },
});
