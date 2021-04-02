export default (objList, indexOfNewObj) => {
    //check ranks before and after new object, if diff is < 2 than update all with new ranks

    const prev = indexOfNewObj ? objList[indexOfNewObj - 1] : null;
    const newObj = objList[indexOfNewObj];
    const next =
        indexOfNewObj < objList.length - 1 ? objList[indexOfNewObj + 1] : null;

    const diff = (next && next.rank) - (prev && prev.rank);
    if (diff < 2) {
        //assign new ranks for all
        return objList.map((obj, i) => {
            obj.rank = (i + 1) * 100;
            return obj;
        });
    }

    //else return [new obj] with rank set to halfway between prev and next
    newObj.rank = next.rank - diff / 2;

    return [newObj];
};
