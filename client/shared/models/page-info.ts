export class PageInfo {
	h1Title: string;
	h2Title: string;
	h3Title: string;
	description: string;
	headerImageUrl: string;
	constructor(h1Title: string, h2Title: string, h3Title: string, description: string, headerImageUrl: string) {
		this.h1Title = h1Title;
		this.h2Title = h2Title;
		this.h3Title = h3Title;
		this.description = description;
		this.headerImageUrl = headerImageUrl;
	}
}