import { useState, type FormEvent } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

function Dashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  function handleAddTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);

    setTitle("");
    setDescription("");
    setIsFormOpen(false);
  }

  function handleToggleTask(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function handleDeleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <span className="welcome-label">SEU ESPAÇO DE ORGANIZAÇÃO</span>
          <h1>Visão geral</h1>
          <p>Organize suas prioridades e acompanhe sua evolução.</p>
        </div>

        <button
          className="add-task-button"
          onClick={() => setIsFormOpen(!isFormOpen)}
        >
          + Nova tarefa
        </button>
      </header>

      {isFormOpen && (
        <section className="tasks-section task-form-section">
          <h2>Nova tarefa</h2>

          <form onSubmit={handleAddTask}>
            <label htmlFor="task-title">Nome da atividade</label>

            <input
              id="task-title"
              type="text"
              placeholder="Ex.: Estudar JavaScript"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />

            <label htmlFor="task-description">Descrição</label>

            <textarea
              id="task-description"
              placeholder="Adicione detalhes sobre a atividade..."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />

            <button type="submit" className="add-task-button">
              Salvar tarefa
            </button>
          </form>
        </section>
      )}

      <section className="summary-grid">
        <article className="summary-card">
          <span>Total de tarefas</span>
          <strong>{tasks.length}</strong>
          <small>Atividades cadastradas</small>
        </article>

        <article className="summary-card">
          <span>Concluídas</span>
          <strong>{completedTasks}</strong>
          <small>Atividades finalizadas</small>
        </article>

        <article className="summary-card">
          <span>Pendentes</span>
          <strong>{pendingTasks}</strong>
          <small>Aguardando execução</small>
        </article>

        <article className="summary-card">
          <span>Hábitos ativos</span>
          <strong>0</strong>
          <small>Rotinas em acompanhamento</small>
        </article>
      </section>

      <section className="tasks-section">
        <div>
          <h2>Minhas atividades</h2>
          <p>Suas tarefas cadastradas aparecerão aqui.</p>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <span>✓</span>
            <strong>Nenhuma tarefa cadastrada</strong>
            <p>Comece adicionando uma atividade à sua rotina.</p>
          </div>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <article
                className={`task-item ${task.completed ? "completed" : ""}`}
                key={task.id}
              >
                <div className="task-info">
                  <strong>{task.title}</strong>
                  <p>{task.description || "Sem descrição"}</p>
                  <span className="task-status">
                    {task.completed ? "Concluída" : "Pendente"}
                  </span>
                </div>

                <div className="task-actions">
                  <button
                    className="complete-button"
                    onClick={() => handleToggleTask(task.id)}
                  >
                    {task.completed ? "Reabrir" : "Concluir"}
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Excluir
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Dashboard;
