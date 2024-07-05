import Image from "next/image";
import logo from "../../_assets/imgs/logo_app.svg"
import FormRegister from "./_components/formRegister";
const RegisterPage = () => {
    return(
        <div className="h-screen">
            <div className="w-1/2">
                <Image src={logo} alt="Horizon bank" height={200} width={200}/>
                <h1 className="text-2xl font-bold">SignUp</h1>
                <FormRegister/>
            </div>
            <div className="w-1/2"></div>
        </div>
    )
}

export default RegisterPage;