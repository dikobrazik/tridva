const getRandomBackground = (context: CanvasRenderingContext2D) => {
    const randomColors = [
        ['#0d3f65', '#655fbb', '#f361e9'],
        ['#4b7aaa', '#767e9c', '#88868e'],
        ['#1a1e9c', '#006ba7', '#2b906f'],
        ['#07887a', '#009be7', '#f47ee4'],
        ['#e7a27c', '#d96a55', '#c71943'],
        ['#1948b0', '#007fbd', '#1ea5a8'],
        ['#d2ed81', '#e2f47c', '#f3fb76'],
        ['#9f7669', '#cf747f', '#f074b7'],
    ];

    const randomIndex = Math.floor(Math.random() * 10) % randomColors.length;

    const [start, middle, end] = randomColors[randomIndex];

    const gradient = context.createLinearGradient(20, 0, 220, 0);

    gradient.addColorStop(0, start);
    gradient.addColorStop(0.5, middle);
    gradient.addColorStop(1, end);

    return gradient;
};

export function generateAvatar(name: string, foregroundColor = 'white') {
    const canvas = document.createElement('canvas');

    const context = canvas.getContext('2d');

    if (!context) throw new Error('[generateAvatar]: no context');

    canvas.width = 200;

    canvas.height = 200;

    const gradient = getRandomBackground(context);

    context.fillStyle = gradient;

    context.fillRect(0, 0, canvas.width, canvas.height);

    context.font = 'bold 100px Assistant';

    context.fillStyle = foregroundColor;

    context.textAlign = 'center';

    context.textBaseline = 'middle';

    const firstLetters = name
        .split(' ')
        .slice(0, 2)
        .map(word => word[0].toLocaleUpperCase())
        .join('');

    context.fillText(firstLetters, canvas.width / 2, canvas.height / 2);

    return new Promise<File>((resolve, reject) =>
        canvas.toBlob(
            blob =>
                blob !== null ? resolve(new File([blob], `${name}.jpeg`)) : reject('[generateAvatar]: blob is null'),
            'image/jpeg',
        ),
    );
}
