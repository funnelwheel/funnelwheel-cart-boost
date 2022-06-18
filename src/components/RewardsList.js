import { useContext } from "@wordpress/element";
import { CartContext } from "../context";
import { ReactComponent as LockIcon } from "./../svg/lock.svg";
import { ReactComponent as StarIcon } from "./../svg/star.svg";

export default function RewardsList({ children }) {
    const { rewardsInformation } = useContext(CartContext);
    const { rewards, rewards_progress, hint } = rewardsInformation.data;

    return (
        <div className="Rewards">
            <ul className="Rewards__list">
                <li className="Rewards__title">Rewards</li>
                {rewards.current_rewards.map((reward, index) => (
                    <li key={index} className="Rewards__item availed">
                        <span className="Rewards__icon">
                            <StarIcon />
                        </span>
                        <span
                            className="Rewards__text"
                            dangerouslySetInnerHTML={{ __html: reward.name }}
                        ></span>
                    </li>
                ))}

                {rewards.next_rewards.map((reward, index) => (
                    <li key={index} className="Rewards__item">
                        <span className="Rewards__icon">
                            <LockIcon />
                        </span>
                        <span
                            className="Rewards__text"
                            dangerouslySetInnerHTML={{ __html: reward.name }}
                        ></span>
                    </li>
                ))}
            </ul>

            <div className="Rewards__progress">
                <div className="Rewards__progress-wrap">
                    <div className="progress">
                        <div
                            className="progress__bar"
                            style={{
                                width: `${rewards_progress}%`,
                            }}
                        ></div>
                    </div>

                    <span
                        dangerouslySetInnerHTML={{ __html: hint }}
                    ></span>
                </div>

                {children}
            </div>
        </div>
    );
}
