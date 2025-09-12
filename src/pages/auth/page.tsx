import { useEffect, useState } from "react"
import { Eye, EyeOff, Check, Grid2x2 } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { loginUser, registerUser } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const loginSchema = z.object({
    email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
    password: z.string()
        .min(8, { message: "A senha deve ter no mínimo 8 caracteres." })
        .regex(/[A-Z]/, { message: "Deve conter pelo menos uma letra maiúscula." })
        .regex(/[a-z]/, { message: "Deve conter pelo menos uma letra minúscula." })
        .regex(/[0-9]/, { message: "Deve conter pelo menos um número." })
        .regex(/[^a-zA-Z0-9]/, { message: "Deve conter pelo menos um caractere especial." }),
});

const registerSchema = z.object({
    name: z.string().min(3, { message: "O nome precisa ter no mínimo 3 caracteres." }),
    email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
    password: z.string()
        .min(8, { message: "A senha deve ter no mínimo 8 caracteres." })
        .regex(/[A-Z]/, { message: "Deve conter pelo menos uma letra maiúscula." })
        .regex(/[a-z]/, { message: "Deve conter pelo menos uma letra minúscula." })
        .regex(/[0-9]/, { message: "Deve conter pelo menos um número." })
        .regex(/[^a-zA-Z0-9]/, { message: "Deve conter pelo menos um caractere especial." }),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    path: ['password'],
    message: 'As senhas não coincidem',
});


type FormData = z.infer<typeof loginSchema> | z.infer<typeof registerSchema>;

export default function AuthPage() {
    const navigate = useNavigate();
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [seePass, setSeePass] = useState<boolean>(false);
    const [sent, setSent] = useState<boolean>(false);
    const [loginForm, setLoginForm] = useState<boolean>(true);

    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm<FormData>({
        resolver: zodResolver(loginForm ? loginSchema : registerSchema),
        mode: "all"
    });

    useEffect(() => {
        clearErrors();
    }, [loginForm, clearErrors]);


    const handleFormSubmit = async (data: FormData) => {
        if (loginForm) {
            try {
                setSent(true)
                const loginData = data as z.infer<typeof loginSchema>
                const user = await loginUser({ email: loginData.email, password: loginData.password });
                console.log("✅ SUCESSO COMPLETO! Usuário logado no Auth e no Firestore:", user);
                navigate('/dashboard')
            } catch (error) {
                setSent(false)
                console.error("❌ Ocorreu um erro durante o processo de registro:", error);
                alert("Falha no registro. Verifique o console do navegador para ver o erro detalhado.");
            }
        } else {
            try {
                // setSent()
                const registerData = data as z.infer<typeof registerSchema>
                console.log("Iniciando processo de registro...");
                const user = await registerUser({ name: registerData.name, email: registerData.email, password: registerData.password });
                console.log("✅ SUCESSO COMPLETO! Usuário criado no Auth e no Firestore:", user);
                alert("Usuário registrado com sucesso em ambos os serviços!");

            } catch (error) {
                console.error("❌ Ocorreu um erro durante o processo de registro:", error);
                alert("Falha no registro. Verifique o console do navegador para ver o erro detalhado.");
            }
        }
    };


    return (
        <>
            <div className={`scale-125 flex min-h-screen w-full fixed bg-black bg-[url('/assets/images/authBG.jpg')] bg-cover bg-center transition-all duration-1000 z-[-1]`}></div>
            <div className="select-none flex flex-col items-start w-full max-w-[550px] bg-black/60 rounded-lg backdrop-blur-md p-6 py-10">

                <Grid2x2 size={40} />
                <h1 className="text-white mt-5 text-[30px]">{loginForm ? 'Entrar com e-mail' : 'Crie sua conta'}</h1>
                <form className="w-full mt-6 flex flex-col gap-4 items-start" id="loginForm" onSubmit={handleSubmit(handleFormSubmit)}>
                    {!loginForm && (
                        <input {...register("name")} type="text" name="name" placeholder="Nome"
                            className={`p-3 w-full placeholder-white/80 rounded-md bg-black/30 text-white
                         hover:bg-black/40 transition-all outline-1 outline-transparent duration-400 cursor-pointer focus:cursor-text focus:bg-black/50 focus:outline-blue-500`} />
                    )}

                    <input {...register("email")} type="email" name="email" placeholder="E-mail"
                        className="w-full p-3 placeholder-white/80 rounded-md bg-black/30 text-white hover:bg-black/40 transition-all outline-1 outline-transparent duration-400 
                    cursor-pointer focus:cursor-text focus:bg-black/50 focus:outline-blue-500" />
                    <p className={`${errors.email?.message ? 'p-1 px-3' : 'opacity-0 mt-[-10px] '} text-red-500 bg-red-700/10  rounded-sm text-[15px] transition-all`}>{errors.email?.message}</p>
                    <div className="relative w-full">
                        <input {...register("password")} type={`${seePass ? 'text' : 'password'}`} name="password" placeholder="Senha"
                            className="w-full p-3 placeholder-white/80 rounded-md bg-black/30 text-white hover:bg-black/40 transition-all 
                            outline-1 outline-transparent duration-400 cursor-pointer focus:cursor-text focus:bg-black/50 focus:outline-blue-500" />
                        {!seePass ?
                            (<Eye onClick={() => setSeePass(true)} className="absolute top-2 text-blue-500 cursor-pointer right-2 rounded-sm w-8 h-8 p-1 transition-all hover:bg-blue-500 hover:text-white" />)
                            :
                            (<EyeOff onClick={() => setSeePass(false)} className="absolute top-2 text-blue-500 cursor-pointer right-2 rounded-sm w-8 h-8 p-1 transition-all hover:bg-blue-500 hover:text-white" />)}
                    </div>
                    <p className={`${errors.password?.message ? 'p-1 px-3' : 'opacity-0 mt-[-10px] '} text-red-500 bg-red-700/10  rounded-sm text-[15px] transition-all`}>{errors.password?.message}</p>
                    {!loginForm && (
                        <input {...register("confirmPassword")} type={`${seePass ? 'text' : 'password'}`} name="confirmPassword" placeholder="Confirmar Senha"
                            className={`p-3 w-full placeholder-white/80 rounded-md bg-black/30 text-white hover:bg-black/40 
                        transition-all outline-1 outline-transparent duration-400 cursor-pointer focus:cursor-text focus:bg-black/50 focus:outline-blue-500`} />
                    )}
                    {loginForm && (
                        <div className="select-none flex flex-row justify-between w-full gap-2 flex-wrap-reverse">
                            <div className="flex flex-row gap-2 p-1 px-2 rounded-md transition-all items-center cursor-pointer hover:bg-blue-200/15" onClick={() => setRememberMe(!rememberMe)}>
                                <div className={`w-5 h-5 rounded-sm flex justify-center items-center border-[1px] transition-all ${rememberMe ? 'border-blue-500 bg-blue-500' : 'border-white'} `}>
                                    {rememberMe && (
                                        <Check className="w-full" />
                                    )}
                                </div>
                                <p className={`${rememberMe ? 'text-blue-300' : 'text-white'} `}>Lembrar de mim</p>
                            </div>
                            <div className="text-blue-300 font-medium text-md cursor-pointer p-1 px-2 transition-all hover:bg-blue-500/40 rounded-lg">
                                Esqueci minha senha
                            </div>
                        </div>
                    )}

                    <button type="submit"
                        disabled={sent}
                        className={`${loginForm ? '' : 'mt-4'} ${sent ? 'opacity-50' : 'hover:bg-blue-500 cursor-pointer'} flex justify-center items-center overflow-hidden p-3 w-full max-h-10 bg-blue-600 text-white font-bold rounded-lg  transition-all`}>
                        {sent ? (<DotLottieReact
                            src="https://lottie.host/e580eaa4-d189-480f-a6ce-f8c788dff90d/MP2FjoJFFE.lottie"
                            className="w-26 p-0"
                            loop
                            autoplay
                        />) : loginForm ? 'Entrar' : 'Criar conta'}
                    </button>
                </form>
                <button disabled={sent} onClick={() => setLoginForm(!loginForm)}
                    className={`${sent ? 'opacity-50' : 'cursor-pointer hover:bg-blue-500/40'} underline text-blue-400 font-medium mt-5 text-md  p-1 px-2 transition-all  rounded-lg`}>
                    {loginForm ? 'Não possui uma conta?' : 'Já possui uma conta?'}
                </button>

                <div className="bg-white/50 w-full h-[1px] mt-8 mb-8"></div>

                <div className="flex flex-col gap-2 w-full items-center">
                    <p className="text-lg">Entrar com</p>
                    <button className="cursor-pointer p-3 w-full flex justify-center items-center max-w-[300px] bg-gray-200 text-white font-bold rounded-lg hover:bg-white transition-colors">
                        <img src="/assets/images/google.png" className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </>
    )
}