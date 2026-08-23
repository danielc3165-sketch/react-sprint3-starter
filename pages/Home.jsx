import { showSuccessMsg } from '../services/event-bus.service.js'

export function Home() {
  return (
    <section className="home container">
      <h1>Welcome to Appsus</h1>
      <p>Manage your notes and emails in one simple place.</p>

      <div className="home-actions">
        <a href="#/note">Open Note</a>
        <a href="#/mail">Open Mail</a>
      </div>

      <button onClick={() => showSuccessMsg('Welcome to Appsus')}>
        Show message
      </button>

      <div className="box-container">
        <div className="home-box">
          <h2>Note's</h2>
          <p>Create and manage your notes.</p>
        </div>

        <div className="home-box">
          <h2>Mail</h2>
          <p>Read and send your emails.</p>
        </div>
      </div>
    </section>
  )
}
