import type { BloomsTaxonomy, Book, BookBloomLevel, Topic } from "@/types/global";
import { convertMathInHtml } from "./latexToHTML";

export function copyTopic(topic: Topic) {
    const title = `${topic.concept.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')}`
    const html = `
    <h2>${title}</h2>
    <ul>
    <li><strong>Grade:</strong> ${topic.gradeLevel}</li>
    <li><strong>Subject Area:</strong> ${topic.subjectArea}</li>
    <li><strong>Link:</strong> <a href="${topic.url ?? 'https://www.bloomexplorer.xyz'}" target="_blank">${topic.url ?? 'https://www.bloomexplorer.xyz'}</a></li>
    </ul>
    <h3>Bloom's Levels:</h3>
    <ul>
    <li><strong>Knowledge:</strong> ${convertMathInHtml(topic.knowledge)}</li>
    <li><strong>Comprehension:</strong> ${convertMathInHtml(topic.comprehension)}</li>
    <li><strong>Application:</strong> ${convertMathInHtml(topic.application)}</li>
    <li><strong>Analysis:</strong> ${convertMathInHtml(topic.analysis)}</li>
    <li><strong>Synthesis:</strong> ${convertMathInHtml(topic.synthesis)}</li>
    <li><strong>Evaluation:</strong> ${convertMathInHtml(topic.evaluation)}</li>
    </ul>
    `;
    const blob = new Blob([html], { type: "text/html" });
    const clipboardItem = new ClipboardItem({ "text/html": blob });
    navigator.clipboard.write([clipboardItem])
}

export function copyBook(book: Book, url?: string) {
    
    const bloomLevels: BookBloomLevel[] = [
    'knowledge',
    'comprehension',
    'application',
    'analysis',
    'synthesis',
    'evaluation',
    ]
    const bookLevelToQuestionList = (level: keyof BloomsTaxonomy) => {
    return `
<h4>${level[0].toUpperCase() + level.slice(1)}</h4>
<ul>
${book[level].map((question) => `<li>${question}</li>`).join('')}
</ul>`
}
    const html = `
<h2>${book.title}</h2>
<ul>
<li><strong>Author:</strong> ${book.author}</li>
<li><strong>Genre:</strong> ${book.genre}</li>
<li><strong>Link:</strong> <a href="${url ?? 'https://www.bloomexplorer.xyz'}" target="_blank">${url ?? 'https://www.bloomexplorer.xyz'}</a></li>
</ul>
<h3>Synopsis</h3>
<p>${book.synopsis}</p>
<h3>Bloom's Levels</h3>
${bloomLevels.map((level) => bookLevelToQuestionList(level)).join('')}
`;


    const blob = new Blob([html], { type: "text/html" });
    const clipboardItem = new ClipboardItem({ "text/html": blob });
    navigator.clipboard.write([clipboardItem])
}

