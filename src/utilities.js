export function replaceTags(text, ruleType, value) {
    const tags = "percent" === ruleType ? ['{{value}}'] : ['{{value}}', '{{currency}}'];
    return tags.reduce(
        (previousValue, currentValue) => {
            const _value = "{{currency}}" === currentValue ? woocommerce_growcart.currency_symbol : value;
            return previousValue.replace(currentValue, _value);
        },
        text
    );
}