/**
 * Created by oba on 20.12.2016.
 */
class StructureEntity {
    constructor() {
        this.uniqueName = '';
        this.coreID = null;
        this.versionID = null;
        this.classArray = [];
        this.attrMap = new Map();
        this.motherStructure = null;
    }

    //getters
    getUniqeName() {
        return this.uniqueName;
    }

    getCoreID() {
        return this.coreID;
    }

    getCoreIDSelector() {
        var t = this;
        var coreIDSelector = ('#' + t.getCoreID());
        return coreIDSelector;
    }

    getVersionID() {
        return this.versionID;
    }

    getSingleClassArrayItem(index) {
        return this.classArray[index];
    }

    getWholeClassArray() {
        return this.classArray;
    }

    getSingleMapAttr(key) {
        return this.attrMap.get(key);
    }

    getAllSingleMapAttrPairs() {
        var t = this;
        for (var [key, value] of t.attrMap.entries()) {
            console.log(key + " = " + value);
        }
    }


    getWholeAttrMap() {
        return this.attrMap;
    }

    getMotherStructure() {
        return this.motherStructure;
    }

    getMotherSelector() {
        var t = this;
        var motherSelector = ('#' + t.getMotherStructure());
        return motherSelector;
    }
    //getters


    //setters
    setUniqueName(uniqueName) {
        this.uniqueName = uniqueName;
    }

    setcoreID(coreID) {
        this.coreID = coreID;
    }

    setVersionID(versionID) {
        this.versionID = versionID;
    }

    pushToClassArray(item) {
        this.classArray.push(item);
    }

    pushToAttrMap(key, value) {
        this.attrMap.set(key, value);
    }

    setMotherStructure(motherStructure) {
        this.motherStructure = motherStructure;
    }
    //setters

}