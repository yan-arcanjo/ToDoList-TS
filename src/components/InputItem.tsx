import { PlusCircle } from "phosphor-react";
import { FormEvent, ChangeEvent, useState } from "react";
import styles from "./InputItem.module.css";
import { Item } from "./Item";
import { v4 as uuidv4 } from "uuid";

interface Item {
	id: string;
	content: string;
}

export function InputItem() {
	const [item, setItem] = useState<Item[]>([]);
	const [newItemText, setNewItemText] = useState("");
	const [checkCount, setCheckCount] = useState(0);

	function handleCheckCount() {
		setCheckCount(checkCount + 1);
	}

	function handleUncheckCount() {
		if (checkCount > 0) {
			setCheckCount(checkCount - 1);
		}
	}

	function handleCreateNewItem(event: FormEvent) {
		event.preventDefault();
		const newItemContent = {
			id: uuidv4(),
			content: newItemText,
		};
		setItem([...item, newItemContent]);
		setNewItemText("");
	}

	function handleNewItemChange(event: ChangeEvent<HTMLInputElement>) {
		event.target.setCustomValidity("");
		setNewItemText(event.target.value);
	}

	function deleteItem(idToDelete: string) {
		const itemsWithoutDeletedOne = item.filter((item) => {
			return item.id != idToDelete;
		});
		setItem(itemsWithoutDeletedOne);
	}

	return (
		<div className={styles.main}>
			<form onSubmit={handleCreateNewItem} className={styles.inputBox}>
				<div className={styles.addItem}>
					<input
						name="item"
						placeholder="Adicione uma nova tarefa"
						value={newItemText}
						onChange={handleNewItemChange}
						required
					/>
					<button type="submit">
						Criar
						<PlusCircle size={16} />
					</button>
				</div>
			</form>
			<div className={styles.countItem}>
				<h3>
					Tarefas criadas <span>{item.length}</span>
				</h3>
				<h3>
					Concluidas{" "}
					<span>
						{checkCount} de {item.length}
					</span>
				</h3>
			</div>

			<div className={styles.wrapper}>
				{item.length > 0 ? (
					<main>
						{item.map((item) => {
							return (
								<Item
									id={item.id}
									key={item.id}
									content={item.content}
									OnDeleteItem={deleteItem}
									onCheck={handleCheckCount}
									onUncheck={handleUncheckCount}
								/>
							);
						})}
					</main>
				) : (
					<main className={styles.noTasks}>
						<img src="../src/assets/Clipboard.svg" alt="" />
						<p>
							<strong>Você ainda não tem tarefas cadastradas</strong>
							<br></br>
							Crie tarefas e organize seus itens a fazer
						</p>
					</main>
				)}
			</div>
		</div>
	);
}
