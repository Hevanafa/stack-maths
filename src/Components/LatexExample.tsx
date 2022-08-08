import Latex from "react-latex-next";

export default function LatexExample() {
    // const eq = "We give illustrations for the three processes $e^+e^-$, gluon-gluon and $\\gamma\\gamma \\to W t\\bar b$."
    const eq = "What is $(3\\times 4) \\div (5-3)$";

    const example = "$\\frac{15}{3} = ?$"
    // const example = "$\\dfrac{15}{3} = ?$"
    // const example = "${a \\above{2pt} b+1}$";
    // const example = "${a \\over b}$";

    return (
        <>
            <Latex>
                {eq}
            </Latex>

            <Latex>
                {example}
            </Latex>
        </>
    );

}