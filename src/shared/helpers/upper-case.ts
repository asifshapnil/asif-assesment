const capitalizeFirst = (str: any) => {
    const string = str?.charAt(0).toUpperCase() + str?.substring(1);
    return string;
};

export default capitalizeFirst;