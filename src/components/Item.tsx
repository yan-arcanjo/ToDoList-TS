import styles from "./Item.module.css";
import { Trash, Circle, CheckCircle } from "phosphor-react";
import { useState } from "react";

interface ItemProps {
	content: string;
	OnDeleteItem: (id: string) => void;
	onCheck: () => void;
	onUncheck: () => void;
	id: string;
}
export function Item({
	content,
	OnDeleteItem,
	onCheck,
	onUncheck,
	id,
}: ItemProps) {
	const [checked, isChecked] = useState(false);
	const [checkedIcon, setCheckedIcon] = useState(
		<Circle color="var(--blue)" size={17.45} />
	);

	function handleDeleteComment() {
		OnDeleteItem(id);
		if (checked != false) {
			onUncheck();
		}
	}

	return (
		<div className={styles.main}>
			<div className={styles.boxItem}>
				<button
					className={checked ? styles.checked : styles.checkButton}
					onClick={() => {
						if (checked) {
							isChecked(false);
							setCheckedIcon(<Circle color="var(--blue)" size={17.45} />);
							onUncheck();
						} else {
							isChecked(true);
							setCheckedIcon(<CheckCircle weight="fill" size={17.45} />);
							onCheck();
						}
					}}>
					{checkedIcon}
				</button>

				<p className={checked ? styles.textChecked : styles.textUnchecked}>
					{content}
				</p>
				<div className={styles.trash}>
					<button onClick={handleDeleteComment}>
						<Trash size={14} />
					</button>
				</div>
			</div>
		</div>
	);
}
