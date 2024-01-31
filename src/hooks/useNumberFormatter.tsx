const useNumberFormatter = () => {
    const formatNumber = (amount: number) => {
        const formattedNumber = amount.toLocaleString('en-US');

        return formattedNumber;
    };

    return { formatNumber };
};

export default useNumberFormatter;