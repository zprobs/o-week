export const graphqlify = (list, term) => {
    const id = term + 'Id';
    let dict = {};
    dict['data'] = list.map(value => {
        let empty = {};
        empty[id] = value;
        return empty;
    });
    return dict;
}
