export default function page() {
    return (
        <section className="py-14">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-y-12 px-2 lg:[grid-template-columns:1fr_auto]">
                    <div className="text-center lg:text-left">
                        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
                            What <br className="hidden lg:block" /> Is{" "}
                            <br className="hidden lg:block" />
                            (Project Name)
                        </h2>
                        <p>(project simple description)</p>
                    </div>

                    <div className="divide-y divide-dashed sm:mx-auto sm:max-w-lg lg:mx-0">
                        <div className="pb-6">
                            <h3 className="font-medium">(header)?</h3>
                            <p className="text-muted-foreground mt-4">
                                (paragraf)
                            </p>

                            <ol className="list-outside list-decimal space-y-2 pl-4">
                                <li className="text-muted-foreground mt-4">
                                    (paragraf)
                                </li>
                                <li className="text-muted-foreground mt-4">
                                    (paragraf)
                                </li>
                                <li className="text-muted-foreground mt-4">
                                    (paragraf)
                                </li>
                            </ol>
                        </div>
                        <div className="py-6">
                            <h3 className="font-medium">(header)</h3>
                            <p className="text-muted-foreground mt-4">
                                (paragraf)
                            </p>
                        </div>
                        <div className="py-6">
                            <h3 className="font-medium">(header)</h3>
                            <p className="text-muted-foreground my-4">
                                (paragraf)
                            </p>
                            <ul className="list-outside list-disc space-y-2 pl-4">
                                <li className="text-muted-foreground">
                                    (paragraf)
                                </li>
                                <li className="text-muted-foreground">
                                    (paragraf)
                                </li>
                            </ul>
                        </div>
                        <div className="py-6">
                            <h3 className="font-medium">
                                Do you offer phone support?
                            </h3>
                            <p className="text-muted-foreground mt-4">
                                (paragraf)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
