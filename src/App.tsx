import React from 'react';
import Latex from "react-latex-next";
import './App.scss'
import { Equation } from './modules/equation';
import { motion } from "framer-motion";
import { random } from 'lodash';

interface IState {
	equationList: Equation[];

	/** LateX string */
	exitingEquation: string;
}

export default class App extends React.Component<{}, IState> {
	constructor(props: any) {
		super(props);

		this.state = {
			// equationList: ["$a + b = ?$", "$c + d = ?$"]
			equationList: [...Array(5)].map((_, i) => new Equation()),
			exitingEquation: ""
		};
	}

	private inputListener(e: React.FormEvent<HTMLInputElement>) {
		const { equationList } = this.state;
		const first = equationList[0];

		// console.log("correct: " + first.getCorrectAnswer());
		// console.log("input: " + e.currentTarget.valueAsNumber);

		if (first.getCorrectAnswer() === e.currentTarget.valueAsNumber) {
			e.currentTarget.value = "";

			const item = equationList.shift();
			const exitingEquation = item!.getLateX();
			item!.generate();
			equationList.push(item!);
			this.setState({ equationList, exitingEquation });
		}
	}

	render() {
		return (
			<div className="board">
				<div className="eq-list">
					{
						this.state.equationList.map((row, idx) =>
							<motion.div
								key={idx}
								animate={{
									opacity: (5 - idx) * 0.2,
									y: (5 - idx) * 60 + "px",
									textShadow: "0 0 " + (5 - idx) * 4 + "px magenta"
								}}
								transition={{ ease: "easeOut" }}>
								{/* Todo: make it slide from top to bottom */}

								<Latex>{row.getLateX()}</Latex>
							</motion.div>
						)
					}
				</div>

				{
					this.state.exitingEquation
						? <motion.div
							initial={{ x: 0, y: "300px", opacity: 1 }}
							animate={{ x: random(0, 1) ? 100 : -100, opacity: 0 }}
							transition={{ duration: 0.2 }}
							onAnimationComplete={() => { console.log("transition end"); this.setState({ exitingEquation: "" }); }}
							
							className="exiting-equation">

							<Latex>{this.state.exitingEquation}</Latex>
						</motion.div>
						: null
				}

				<input type="number" onInput={this.inputListener.bind(this)} style={{ transform: "translateY(360px)" }} />

				{/* <LatexExample /> */}
			</div>
		)
	}
}
