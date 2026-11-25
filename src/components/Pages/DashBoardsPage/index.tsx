import StatCard from "../../common/stat-card";
import { useUsers } from "../../../context/UsersContext";
import { useReceipts } from "../../../context/ReceiptsContext";
import { useCards } from "../../../context/CardsContext";
import "./style.scss";

export default function DashBoardsPage() {
  const { users } = useUsers();
  const { receipts } = useReceipts();
  const { cards } = useCards();

  const emailsCount = users.length;
  const tasks = cards.flatMap((card) => card.tasks);
  const doneTasks = tasks.filter((task) => task.completed).length;

  return (
    <section className="dashboard">
      <h1>Dashboard</h1>

      <div className="dashboard__grid">
        <StatCard label="Receipts" value={receipts.length} />
        <StatCard label="Emails" value={emailsCount} />
        <StatCard label="Cards" value={cards.length} />
        <StatCard
          label="Tasks done"
          value={doneTasks}
          hint={`of ${tasks.length}`}
        />
      </div>
    </section>
  );
}
