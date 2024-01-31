const usePriceFormatter = () => {
    const formatAmount = (amount: number) => {
        const formattedPrice = amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'PHP',
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
        });

        return formattedPrice;
    };

    return { formatAmount };
};

export default usePriceFormatter;