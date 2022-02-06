import { useQuery } from "react-query";
import { getRewards } from "../api";
import { ReactComponent as LockIcon } from "./../svg/lock.svg";
import { ReactComponent as StarIcon } from "./../svg/star.svg";

export default function Rewards() {
	const { isLoading, error, data: rewards } = useQuery("rewards", getRewards);

	if (isLoading) return "Loading...";
	if (error) return "An error has occurred: " + error.message;

	return (
		<div className="Rewards">
			<ul className="Rewards__list">
				{rewards.data.rewards.current_rewards.map((reward) => (
					<li>
						<span className="Rewards__icon">
							<StarIcon />
						</span>
						<span className="Rewards__text">{reward.name}</span>
					</li>
				))}

				{rewards.data.rewards.next_rewards.map((reward) => (
					<li>
						<span className="Rewards__icon">
							<LockIcon />
						</span>
						<span className="Rewards__text">{reward.name}</span>
					</li>
				))}
			</ul>

			<span>{rewards.data.hint}</span>
		</div>
	);
}
