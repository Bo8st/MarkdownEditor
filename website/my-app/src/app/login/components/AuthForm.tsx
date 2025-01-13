'use client'

import { Button } from "@/components/ui/button";
import { Card , CardHeader, CardDescription, CardTitle, CardContent} from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);


    return (
        <div>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>{isLogin ? 'Login' : 'Register'}</CardTitle>
                    <CardDescription>{isLogin ? 'Please sign in' : 'Create your account'}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="username_email">Username/Email</Label>
                            <Input id="username_email" name="username_email" type="text" placeholder="Enter your email or username" required />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" placeholder="Enter your password" required />
                        </div>
                        <div>
                            {!isLogin ?  <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Confirm Password</Label>
                                <Input id="password" name="password" type="password" placeholder="Confirm your password" required />
                                </div> : 
                                ''}
                        </div>
                            <Button type="submit" className="w-full">
                                {isLogin ? 'Login' : 'Create'}
                            </Button>
                        </div>
                        
                        
                    </form>
                    <p className='mt-4 text-sm'>{isLogin ? "Don't have an account? " : "Already have an account? "}
                        <Button variant="link" className="p-0" onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? 'Register' : 'Login'}
                        </Button>
                    </p>
                </CardContent>
            </Card>    
        </div> 
    );
}