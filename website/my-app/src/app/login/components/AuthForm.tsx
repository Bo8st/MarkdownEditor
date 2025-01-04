import { Button } from "@/components/ui/button";
import { Card , CardHeader, CardDescription, CardTitle, CardContent} from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AuthForm() {
    return (
        <div>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login Form</CardTitle>
                    <CardDescription>Please sign in</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="Enter your email" required />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" placeholder="Enter your password" required />
                        </div>
                        <Button type="submit" className="w-full">Submit
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>    
        </div> 
    );
}