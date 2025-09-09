
import './App.css'
import { registerUser } from './services/auth';

function App() {

  const handleRegister = async () => {
    // 1. Adicione um bloco try...catch para capturar os erros
    try {
      console.log("Iniciando processo de registro...");
      // 2. Use 'await' para esperar a função terminar
      const user = await registerUser({ email: 'novoo-usuario@teste.com', password: 'password123' });
      console.log("✅ SUCESSO COMPLETO! Usuário criado no Auth e no Firestore:", user);
      alert("Usuário registrado com sucesso em ambos os serviços!");

    } catch (error) {
      // 3. Se algo der errado, o erro será capturado e exibido aqui
      console.error("❌ Ocorreu um erro durante o processo de registro:", error);
      alert("Falha no registro. Verifique o console do navegador para ver o erro detalhado.");
    }
  };

  return (
    <div className="App">
      <h1>Teste de Requisições com Emulador Firebase</h1>

      {/* 3. Crie um botão que chama a função de teste */}
      <button
        onClick={handleRegister}
        style={{ padding: '12px 24px', fontSize: '18px', cursor: 'pointer' }}
      >
        Adicionar Item ao Firestore Local
      </button>
    </div>
  )
}


export default App
