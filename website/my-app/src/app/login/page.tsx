import { Card , CardHeader, CardDescription, CardTitle} from "@/components/ui/card";
import AuthForm from './components/AuthForm'

export default function loginPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">Welcome to Our App</h1>
        <AuthForm/> 
        </main>
    );
}