import puppeteer, { type PDFOptions, type Browser, type Page } from "puppeteer";
import { omit } from "radash";

interface GeneratorOptions extends PDFOptions {
	args?: string[];
	headless?: boolean | "shell";
}

class Generator {
	private browser: Browser | null = null;
	private options: GeneratorOptions = {};

	constructor(options: GeneratorOptions = {}) {
		this.browser = null;
		this.options = options;
	}

	async setOptions(options: GeneratorOptions) {
		this.options = options;
	}

	async getPage() {
		await this.run();

		if (!this.browser) {
			throw new Error("Browser not initialized");
		}
		const page = await this.browser.newPage();

		return page;
	}
	public async generate(content: string) {
		await this.run();
		if (!this.browser) {
			throw new Error("Browser not initialized");
		}
		const timeout = this.options.timeout
			? { timeout: this.options.timeout }
			: {};
		const page = await this.getPage();
		await page.setContent(content, {
			waitUntil: ["domcontentloaded", "networkidle2"],
			...timeout,
		});
		const pdfBuffer = await this.generatePDF(page);
		await page.close();

		return pdfBuffer;
	}
	private async run() {
		if (this.browser) {
			return;
		}
		try {
			const headless = this.options.headless || false;
			console.log(headless);
			const launchOptions = {
				args: this.options.args,
				headless,
			};
			this.browser = await puppeteer.launch(launchOptions);

			this.browser.on("disconnected", () => {
				this.browser = null;
			});

			this.browser.on("error", (error) => {
				console.error("Browser error:", error);
			});
		} catch (error) {
			throw new Error(
				`Failed to connect to browser: ${(error as Error).message}`,
			);
		}
	}
	private async closeBrowser() {
		if (this.browser) {
			await this.browser.close();
			this.browser = null;
		}
	}
	private async generatePDF(page: Page) {
		const data = await page.pdf({
			...omit(this.options, ["args", "headless"]),
			printBackground:
				this.options?.printBackground !== undefined
					? this.options.printBackground
					: true,
		});
		return Buffer.from(data);
	}
	private async closeBrowserTabs() {
		if (!this.browser) {
			throw new Error("Browser not initialized");
		}
		const pages = await this.browser.pages();
		for (let i = 1; i < pages.length; i++) {
			await pages[i].close();
		}
	}
}

export const generator = new Generator();
