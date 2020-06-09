export const graphqlify = (list, term) => {
    const id = term + 'Id';
    let dict = {};
    dict['data'] = list.map(value => {
        let empty = {};
        empty[id] = value;
        return empty;
    });
    return dict;
};

export const yearsData = ['First Year', 'Second Year', 'Third Year', 'Fourth Year', 'Graduate School'];
export const facultiesData = ['ABC', 'EFG', 'HIJ'];
