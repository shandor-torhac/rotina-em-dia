import { useEffect, useState, type FormEvent } from "react";

type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: string;
};

function Dashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Sem categoria");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("rotina-em-dia-tasks");

    if (!savedTasks) {
      return [];
    }

    try {
      return JSON.parse(savedTasks) as Task[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("rotina-em-dia-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  function handleEditTask(id: string) {
    const taskToEdit = tasks.find((task) => task.id === id);

    if (!taskToEdit) {
      return;
    }

    setTitle(taskToEdit.title);
    setDescription(taskToEdit.description);
    setCategory(taskToEdit.category);
    setEditingTaskId(taskToEdit.id);
    setIsFormOpen(true);
  }

  function handleAddTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    if (editingTaskId) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTaskId
            ? {
                ...task,
                title: title.trim(),
                description: description.trim(),
                category: category,
              }
            : task,
        ),
      );
    } else {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: title.trim(),
        description: description.trim(),
        completed: false,
        category: category,
      };

      setTasks([...tasks, newTask]);
    }

    setTitle("");
    setDescription("");
    setEditingTaskId(null);
    setIsFormOpen(false);
  }

  function handleToggleTask(id: string) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function handleDeleteTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleOpenNewTask() {
    setEditingTaskId(null);
    setTitle("");
    setDescription("");
    setIsFormOpen(true);
  }

  function handleCancelForm() {
    setEditingTaskId(null);
    setTitle("");
    setDescription("");
    setIsFormOpen(false);
  }

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <span className="welcome-label">SEU ESPAÇO DE ORGANIZAÇÃO</span>
          <h1>Visão geral</h1>
          <p>Organize suas prioridades e acompanhe sua evolução.</p>
        </div>

        <button className="add-task-button" onClick={handleOpenNewTask}>
          + Nova tarefa
        </button>
      </header>

      {isFormOpen && (
        <section className="tasks-section task-form-section">
          <h2>{editingTaskId ? "Editar tarefa" : "Nova tarefa"}</h2>

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

            <label htmlFor="task-category">Categoria</label>

            <select
              id="task-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="Sem categoria">Sem categoria</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Estudos">Estudos</option>
              <option value="Pessoal">Pessoal</option>
              <option value="Família">Família</option>
              <option value="Saúde">Saúde</option>
              <option value="Finanças">Finanças</option>
            </select>

            <div className="task-actions">
              <button type="submit" className="add-task-button">
                {editingTaskId ? "Salvar alterações" : "Salvar tarefa"}
              </button>

              <button
                type="button"
                className="delete-button"
                onClick={handleCancelForm}
              >
                Cancelar
              </button>
            </div>
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
                  <span className="task-category">{task.category}</span>
                  <span className="task-status">
                    {task.completed ? "Concluída" : "Pendente"}
                  </span>
                </div>

                <div className="task-actions">
                  <button
                    className="edit-button"
                    onClick={() => handleEditTask(task.id)}
                  >
                    Editar
                  </button>

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
