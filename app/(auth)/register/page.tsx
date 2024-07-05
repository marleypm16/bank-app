import Image from "next/image";
import logo from "../../_assets/imgs/logo_app.svg"
import FormRegister from "./_components/formRegister";
import imagePreview from "../../_assets/imgs/image_preview.svg";
const RegisterPage = () => {
    return(
        <div className="max-h-screen flex items-center justify-between">
            <div className="w-1/2 h-1/2">
                <Image src={logo} alt="Horizon bank" height={200} width={200}/>
                <h1 className="text-2xl font-bold">SignUp</h1>
                <FormRegister/>
            </div>
            <div className="w-1/2">
                <Image src={imagePreview} alt="app preview" height={500} width={500}/>
            </div>
        </div>
    )
}

export default RegisterPage;