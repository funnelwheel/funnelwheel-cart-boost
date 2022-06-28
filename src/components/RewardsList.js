import { useContext, useEffect } from "@wordpress/element";
import { CartContext } from "../context";
import { ReactComponent as LockIcon } from "./../svg/lock.svg";
import { ReactComponent as StarIcon } from "./../svg/star.svg";

export default function RewardsList({ children }) {
    const { rewardsInformation } = useContext(CartContext);
    const { rewards, rewards_progress, hint } = rewardsInformation.data;

    useEffect(() => {
        const slider = document.querySelector('.Rewards__list ul');
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 3; //scroll-fast
            slider.scrollLeft = scrollLeft - walk;
            console.log(walk);
        });
    }, [rewards]);

    return (
        <div className="Rewards">
            <div className="Rewards__list">
                <span className="Rewards__list-title">Rewards</span>
                <ul>
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
            </div>


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
