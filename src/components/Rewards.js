import { useQuery } from "react-query";
import { getRewards } from "../api";
import { ReactComponent as LockIcon } from "./../svg/lock.svg";
import { ReactComponent as StarIcon } from "./../svg/star.svg";

export default function Rewards({ children }) {
	const { isLoading, error, data: rewards } = useQuery("rewards", getRewards);

	if (isLoading) return "Loading...";
	if (error) return "An error has occurred: " + error.message;

	return (
		<div className="Rewards">
			<ul className="Rewards__list">
				<li className="Rewards__title">Rewards</li>
				{rewards.data.rewards.current_rewards.map((reward, index) => (
					<li key={index}>
						<span className="Rewards__icon availed">
							<StarIcon />
						</span>
						<span className="Rewards__text">{reward.name}</span>
					</li>
				))}

				{rewards.data.rewards.next_rewards.map((reward, index) => (
					<li key={index}>
						<span className="Rewards__icon">
							<LockIcon />
						</span>
						<span className="Rewards__text">{reward.name}</span>
					</li>
				))}
			</ul>

			<div className="Rewards__progress">
				<div className="Rewards__progress-wrap">
					<div className="progress">
						<div
							className="progress__bar"
							style={{
								width: `${rewards.data.rewards_progress}%`,
							}}
						></div>
					</div>

					<span>{rewards.data.hint}</span>
				</div>

				{children}
			</div>
		</div>
	);
}
