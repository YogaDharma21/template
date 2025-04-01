import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export default function page() {
    return (
        <section className="py-32">
            <div className="mx-auto max-w-5xl px-8 lg:px-0">
                <h1 className="text-center text-4xl font-semibold lg:text-5xl">
                    Contact Us
                </h1>
                <p className="mt-4 text-center">
                    We'll help you find the solution of your question.
                </p>

                <Card className="mx-auto mt-12 max-w-lg p-8 shadow-md sm:p-16">
                    <form
                        action=""
                        className="**:[&>label]:block space-y-6 *:space-y-3"
                    >
                        <div>
                            <Label htmlFor="name">Full name</Label>
                            <Input type="text" id="name" required />
                        </div>

                        <div>
                            <Label htmlFor="email">Work Email</Label>
                            <Input type="email" id="email" required />
                        </div>

                        <div>
                            <Label htmlFor="msg">Message</Label>
                            <Textarea id="msg" rows={3} />
                        </div>

                        <Button>Submit</Button>
                    </form>
                </Card>
            </div>
        </section>
    );
}
