import { Label } from "@/components/ui/label";
import { eyeOff, eyeOn } from "../../assets/asset";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState, type FormEvent } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { useRegister } from "./hooksRegister";
import type { IRegisterResponse } from "./authType";
import type { AxiosError } from "axios";
import { Spinner } from "@/components/ui/spinner";
import LogoAuth from "@/components/LogoAuth";
import { useAppSelector } from "@/redux/3_redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [name, setName] = useState("");
    const [nameValid, setNameValid] = useState(true);
    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(true);
    const [phone, setPhone] = useState("");
    const [phoneValid, setPhoneValid] = useState(true);
    const [password, setPassword] = useState("");
    const [passwordValid, setPasswordValid] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);

    const [registerMessage, setRegisterMessage] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState(true);


    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const handleName = (text: string) => {
        setName(text);
        setNameValid(text.length > 0);
    }

    const handleEmail = (text: string) => {
        setEmail(text);
        setEmailValid(text.length > 0);
    }

    const handlePhone = (text: string) => {
        setPhone(text);
        setPhoneValid(text.length > 0);
    }

    const handlePassword = (text: string) => {
        setPassword(text);
        setPasswordValid(text.length > 0);
    }

    const handleConfirmPassword = (text: string) => {
        setConfirmPassword(text);
        setConfirmPasswordValid(text.length > 0);
    }

    const { mutate: mutateRegister, isPending: isPendingRegister } = useRegister();

    const handleSubmitLogin = (e: FormEvent) => {
        e.preventDefault();


        if (confirmPassword === password) {
            mutateRegister({
                name: name,
                email: email,
                phone: phone,
                password: password
            }, {
                onSuccess: (data: IRegisterResponse) => {
                    setRegisterSuccess(data.success);
                    setRegisterMessage(data.message);

                    setName('');
                    setEmail('');
                    setPhone('');
                    setPassword('');
                    setConfirmPassword('');
                },
                onError: (e) => {
                    const error = e as AxiosError<{ success: boolean; message: string }>;
                    if (error.response?.data) {
                        setRegisterSuccess(error.response.data.success);
                        setRegisterMessage(error.response.data.message);
                    } else {
                        setRegisterMessage('An unexpected error occurred.');
                    }
                }
            });
        } else {
            setRegisterSuccess(false);
            setRegisterMessage("Password dan confirm password tidak sama");
        }
    }

    const authState = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

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
                    <span className="text-display-xs md:text-display-sm font-bold">Register</span>
                    <span className="text-sm md:text-md">Create your account to start borrowing books.</span>
                </div>

                <form method="POST" onSubmit={handleSubmitLogin} className="flex flex-col gap-4">

                    <Label>Name</Label>
                    <Field data-invalid={!nameValid}>
                        <Input
                            disabled={isPendingRegister}
                            aria-invalid={!nameValid}
                            value={name}
                            onChange={(e) => handleName(e.target.value)}
                            type="text"
                            id="name"
                            name="name"
                            className="py-2 px-4 h-12" />
                        {!nameValid && (<FieldLabel className="text-xs text-accent-red" >Name required</FieldLabel>)}
                    </Field>

                    <Label>Email</Label>
                    <Field data-invalid={!emailValid}>
                        <Input
                            disabled={isPendingRegister}
                            aria-invalid={!emailValid}
                            value={email}
                            onChange={(e) => handleEmail(e.target.value)}
                            type="email"
                            id="email"
                            name="email"
                            className="py-2 px-4 h-12" />
                        {!emailValid && (<FieldLabel className="text-xs text-accent-red" >Email required</FieldLabel>)}
                    </Field>

                    <Label>Phone</Label>
                    <Field data-invalid={!phoneValid}>
                        <Input
                            disabled={isPendingRegister}
                            aria-invalid={!phoneValid}
                            value={phone}
                            onChange={(e) => handlePhone(e.target.value)}
                            type="tel"
                            id="phone"
                            name="phone"
                            className="py-2 px-4 h-12" />
                        {!phoneValid && (<FieldLabel className="text-xs text-accent-red" >Phone required</FieldLabel>)}
                    </Field>

                    <Label>Password</Label>
                    <Field data-invalid={!passwordValid}>
                        <div className="relative flex flex-col w-full gap-4">
                            <Input
                                disabled={isPendingRegister}
                                aria-invalid={!passwordValid}
                                value={password}
                                onChange={(e) => handlePassword(e.target.value)}
                                type={!showPassword ? 'password' : 'text'}
                                id="password" name="password"
                                className="py-2 px-4 h-12" />
                            <Button
                                type="button"
                                onClick={handleShowPassword}
                                variant={'ghost2'}
                                className="absolute right-0 top-1/2 -translate-y-1/2 my-auto">
                                <img src={!showPassword ? eyeOn : eyeOff} />
                            </Button>
                        </div>
                        {!passwordValid && (<FieldLabel className="text-xs text-accent-red" >Password required</FieldLabel>)}
                    </Field>

                    <Label>Confirm Password</Label>
                    <Field data-invalid={!confirmPasswordValid}>
                        <div className="relative flex flex-col w-full gap-4">
                            <Input
                                disabled={isPendingRegister}
                                aria-invalid={!confirmPasswordValid}
                                value={confirmPassword}
                                onChange={(e) => handleConfirmPassword(e.target.value)}
                                type={!showConfirmPassword ? 'password' : 'text'}
                                id="password" name="password"
                                className="py-2 px-4 h-12" />
                            <Button
                                type="button"
                                onClick={handleShowConfirmPassword}
                                variant={'ghost2'}
                                className="absolute right-0 top-1/2 -translate-y-1/2 my-auto">
                                <img src={!showConfirmPassword ? eyeOn : eyeOff} />
                            </Button>
                        </div>
                        {!confirmPasswordValid && (<FieldLabel className="text-xs text-accent-red" >Confirm Password required</FieldLabel>)}
                    </Field>

                    <Button type="submit" className="rounded-full bg-primary-300 h-12 text-sm md:text-md font-bold">{isPendingRegister && (<Spinner />)} Submit</Button>

                    {registerMessage !== "" && (
                        <p className={`text-danger text-sm text-center font-medium ${registerSuccess ? 'text-accent-green' : 'text-accent-red'}`}>
                            {registerMessage}
                        </p>
                    )}

                    <span className="text-center text-sm md:text-md">Already have an account? <a href="/login" className="text-primary-300 font-semibold md:font-bold">Log In</a></span>
                </form>
            </div>
        </section>
    )
}
export default Register;