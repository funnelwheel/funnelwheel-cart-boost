import { v4 as uuidv4 } from "uuid";
import RulesList from "./RulesList";

export default function RewardsListItem({
    rewardTypeLabels,
    activeRewardItem,
    updateReward
}) {
    return (
        <div className="RewardsListItem">
            <div className="RewardsListItem__col">
                <div className="RewardsListItem__type">
                    <div className="RewardsListItem__type-label">
                        Reward type
                    </div>
                    <div className="RewardsListItem__type-value">
                        {rewardTypeLabels[activeRewardItem.type]}
                    </div>
                </div>

                <RulesList
                    {...{
                        reward: activeRewardItem,
                        addRule: () =>
                            updateReward({
                                ...activeRewardItem,
                                rules: [
                                    ...activeRewardItem.rules,
                                    {
                                        id: uuidv4(),
                                        name: "20 USD",
                                        minimum_cart_amount: 0,
                                        value: 0,
                                    },
                                ],
                            }),
                        updateRule: () => {},
                        removeRule: (ruleId) => {
                            updateReward({
                                ...activeRewardItem,
                                rules: activeRewardItem.rules.filter(
                                    (rule) => rule.id !== ruleId
                                ),
                            });
                        },
                    }}
                />
            </div>

            <div className="RewardsListItem__col">Preview</div>
        </div>
    );
}