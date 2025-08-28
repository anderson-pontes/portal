import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import logo from '@/assets/logo.svg'

// --- Ícones como componentes React para um visual mais limpo ---
const Eye = (props:any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOff = (props:any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
);

// --- Esquema de validação e tipos (sem alterações) ---
const loginSchema = z.object({
  username: z.string().min(1, "O nome de usuário é obrigatório."),
  password: z.string().min(1, "A senha é obrigatória."),
  remember: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;
type LoginResponse = { token: string };


// --- Componente principal da página de login ---
export default function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "", remember: false },
  });

  

  // --- Função de submissão com a chamada real à API ---
  async function onSubmit(values: LoginForm) {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://10.96.0.67/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: values.username, password: values.password }),
      });

      if (!res.ok) {
        let text;
        try {
          // Tenta extrair uma mensagem de erro do corpo da resposta
          const errorData = await res.json();
          text = errorData.message || `Erro HTTP ${res.status}`;
        } catch {
          text = `Erro HTTP ${res.status}`;
        }
        throw new Error(text);
      }

      const data: LoginResponse = await res.json();

      // Salvar token
      if (values.remember) {
        localStorage.setItem("auth_token", data.token);
      } else {
        sessionStorage.setItem("auth_token", data.token);
      }

      // Redirecionar para home
      navigate("/app/home");

    } catch (err: any) {
      setError(err?.message ?? "Ocorreu um erro desconhecido. Verifique a conexão.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2 bg-slate-50 font-sans">
      {/* Coluna da Esquerda: Branding e Informações */}
      <div className="hidden bg-gradient-to-br from-blue-900 to-slate-900 lg:flex flex-col items-center justify-center p-12 text-white">
        <div className="w-full max-w-md text-center">
            <img className="h-20 w-20 mx-auto mb-6" src={logo} alt="Logo" />            
            <h1 className="text-4xl font-bold tracking-tight">
                Intranet PGE-PA
            </h1>
            <p className="mt-4 text-lg text-slate-300">
                Acesso exclusivo para servidores e colaboradores da Procuradoria-Geral do Estado do Pará.
            </p>
            <div className="mt-10 border-t border-slate-700 pt-6 text-sm text-slate-400">
                <p>Para suporte técnico, entre em contato com o setor de TI.</p>
                <p className="mt-2">© {new Date().getFullYear()} PGE-PA - Todos os direitos reservados.</p>
            </div>
        </div>
      </div>

      {/* Coluna da Direita: Formulário de Login */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Login
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Utilize suas credenciais de rede (AD).
            </p>
          </div>

          <div className="bg-white p-8 shadow-xl rounded-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700 border border-red-200">
                  <p className="font-semibold">Erro de Autenticação</p>
                  <p>{error}</p>
                </div>
              )}

              {/* Campo de Usuário */}
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-gray-700">
                  Usuário
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="usuario de rede PGE"
                  {...register("username")}
                  autoComplete="username"
                  className={`w-full px-4 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out`}
                />
                {errors.username && <p className="text-sm text-red-600">{errors.username.message}</p>}
              </div>

              {/* Campo de Senha */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Senha
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha de rede"
                    {...register("password")}
                    autoComplete="current-password"
                    className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
              </div>

              

              {/* Botão de Entrar */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Verificando..." : "Entrar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
