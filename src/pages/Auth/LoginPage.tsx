import { Label } from "@/components/ui/label";
import { eyeOff, eyeOn, } from "../../assets/asset";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState, type FormEvent } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { useLogin } from "./hooksLogin";
import type { ILoginResponse } from "./authType";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/3_redux";
import { Spinner } from "@/components/ui/spinner";
import { setLoginData } from "@/redux/1_authSlice";
import LogoAuth from "@/components/LogoAuth";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(true);
    const [password, setPassword] = useState("");
    const [passwordValid, setPasswordValid] = useState(true);

    const [loginErrMessage, setLoginErrMessage] = useState('');

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleEmail = (text: string) => {
        setEmail(text);
        setEmailValid(text.length > 0);
    }

    const handlePassword = (text: string) => {
        setPassword(text);
        setPasswordValid(text.length > 0);
    }

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const authState = useAppSelector((state) => state.auth);
    const { mutate: mutateLogin, isPending: isPendingLogin } = useLogin();

    const handleSubmitLogin = (e: FormEvent) => {
        e.preventDefault();

        if (emailValid && passwordValid) {
            mutateLogin({
                email: email,
                password: password
            }, {
                onSuccess: (data: ILoginResponse) => {
                    console.log(data, 'logindata');
                    dispatch(setLoginData({
                        user: data.data.user,
                        accessToken: data.data.token
                    }));
                    navigate('/');
                },
                onError: () => {
                    setLoginErrMessage('Username or password is not correct')
                }
            });
        }
    }

    useEffect(() => {
        if (authState.accessToken !== "" && authState.isLoggedin) {
            navigate('/');
            return;
        }
    }, [authState.accessToken, authState.isLoggedin, navigate]);

    return (
        <section id="login-page" className="flex flex-row w-full min-h-screen items-center justify-center">
            <div id="login-form-div" className="flex flex-col w-full max-w-81 md:max-w-100 gap-5">

                <LogoAuth />

                <div className="flex flex-col">
                    <span className="text-display-xs md:text-display-sm font-bold">Login</span>
                    <span className="text-sm md:text-md">Sign in to manage your library account.</span>
                </div>

                <form method="POST" onSubmit={handleSubmitLogin} className="flex flex-col gap-4">
                    <Label>Email</Label>
                    <Field data-invalid={!emailValid}>
                        <Input
                            disabled={isPendingLogin}
                            aria-invalid={!emailValid}
                            value={email}
                            onChange={(e) => handleEmail(e.target.value)}
                            type="email"
                            id="email"
                            name="email"
                            className="py-2 px-4 h-12" />
                        {!emailValid && (<FieldLabel className="text-xs text-accent-red" >Email required</FieldLabel>)}
                    </Field>
                    <Label>Password</Label>
                    <Field data-invalid={!passwordValid}>
                        <div className="relative flex flex-col w-full gap-4">
                            <Input
                                disabled={isPendingLogin}
                                aria-invalid={!passwordValid}
                                value={password}
                                onChange={(e) => handlePassword(e.target.value)}
                                type={!showPassword ? 'password' : 'text'}
                                id="password" name="password"
                                className="py-2 px-4 h-12" />
                            <Button type="button" onClick={handleShowPassword} variant={'ghost2'} className="absolute right-0 top-1/2 -translate-y-1/2 my-auto"><img src={!showPassword ? eyeOn : eyeOff} /></Button>
                        </div>
                        {!passwordValid && (<FieldLabel className="text-xs text-accent-red" >Password required</FieldLabel>)}
                    </Field>

                    <Button
                        disabled={isPendingLogin}
                        type="submit"
                        className="rounded-full bg-primary-300 h-12 text-sm md:text-md font-bold">{isPendingLogin && (<Spinner />)}Login</Button>

                    {loginErrMessage !== "" && (
                        <p className={`text-danger text-sm text-center font-medium text-accent-red`}>
                            {loginErrMessage}
                        </p>
                    )}

                    <span className="text-center text-sm md:text-md">Don't have an account? <a href="/register" className="text-primary-300 font-semibold md:font-bold">Register</a></span>
                </form>
            </div>
        </section>
    )
}
export default LoginPage;