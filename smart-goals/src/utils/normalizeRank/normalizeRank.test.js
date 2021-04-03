import normalizeRank from './index';

test('generates new ranks', () => {
    const objArray = [
        { name: 'A' },
        { name: 'B', rank: 0 },
        { name: 'C', rank: 0 },
        { name: 'D', rank: 0 },
        { name: 'E', rank: 0 },
    ];

    const normalizedArr = normalizeRank(objArray, 0);

    expect(normalizedArr).toStrictEqual([
        { name: 'A', rank: 100 },
        { name: 'B', rank: 200 },
        { name: 'C', rank: 300 },
        { name: 'D', rank: 400 },
        { name: 'E', rank: 500 },
    ]);
});

test('adds new obj with rank', () => {
    const objArray = [
        { name: 'A', rank: 100 },
        { name: 'B', rank: 200 },
        { name: 'C', rank: 300 },
        { name: 'D', rank: 400 },
        { name: 'E' },
    ];

    const normalizedArr = normalizeRank(objArray, objArray.length - 1);

    expect(normalizedArr).toStrictEqual([{ name: 'E', rank: 500 }]);
});

test('normalization triggered', () => {
    const objArray = [
        { name: 'A' },
        { name: 'B', rank: 2 },
        { name: 'C', rank: 3 },
        { name: 'D', rank: 4 },
        { name: 'E', rank: 5 },
    ];

    const normalizedArr = normalizeRank(objArray, 0);

    expect(normalizedArr).toStrictEqual([
        { name: 'A', rank: 100 },
        { name: 'B', rank: 200 },
        { name: 'C', rank: 300 },
        { name: 'D', rank: 400 },
        { name: 'E', rank: 500 },
    ]);
});

test('normalization NOT triggered', () => {
    const objArray = [
        { name: 'A' },
        { name: 'B', rank: 3 },
        { name: 'C', rank: 4 },
        { name: 'D', rank: 5 },
        { name: 'E', rank: 6 },
    ];

    const normalizedArr = normalizeRank(objArray, 0);

    expect(normalizedArr).toStrictEqual([{ name: 'A', rank: 2 }]);
});

test('move obj to end of list', () => {
    const objArray = [
        { name: 'B', rank: 200 },
        { name: 'C', rank: 300 },
        { name: 'D', rank: 400 },
        { name: 'E', rank: 500 },
        { name: 'A', rank: 100 },
    ];

    const normalizedArr = normalizeRank(objArray, 4);

    expect(normalizedArr).toStrictEqual([{ name: 'A', rank: 600 }]);
});

test('move obj to beginning of list', () => {
    const objArray = [
        { name: 'E', rank: 500 },
        { name: 'A', rank: 100 },
        { name: 'B', rank: 200 },
        { name: 'C', rank: 300 },
        { name: 'D', rank: 400 },
    ];

    const normalizedArr = normalizeRank(objArray, 0);

    expect(normalizedArr).toStrictEqual([{ name: 'E', rank: 50 }]);
});

test('switch', () => {
    const objArray = [
        { name: 'A', rank: 100 },
        { name: 'C', rank: 300 },
        { name: 'B', rank: 200 },
        { name: 'D', rank: 400 },
        { name: 'E', rank: 500 },
    ];

    const normalizedArr = normalizeRank(objArray, 1);

    expect(normalizedArr).toStrictEqual([{ name: 'C', rank: 150 }]);
});
