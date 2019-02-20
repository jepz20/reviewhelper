const fs = require('fs');
const path = require('path');

const titleIndicator = '##';
const baseFolder = './projects';
const parseFolder = './src/projects';

const isTitle = (line = '') => line.startsWith(titleIndicator);
const isEmpty = (line = '') => line.trim().length === 0;

const stringify = json => JSON.stringify(json, null, 2);
const mdBaseName = filename => path.basename(filename, '.md');
const parseProject = filename => {
  const lines = fs
    .readFileSync(`${baseFolder}/${filename}`, 'utf8')
    .split('\n');
  const advices = lines.reduce((advices, line, index) => {
    if (isTitle(line)) {
      advices.push({
        title: line.split(titleIndicator)[1].trim(),
        description: '',
      });
    } else {
      if (isEmpty(line) && isTitle(lines[index + 1])) {
        return advices;
      }
      if (advices[advices.length - 1] == undefined) {
        throw new Error(`There was no title defined for line \n ${line}`);
      }

      advices[advices.length - 1].description += `${line}\n`;
    }
    return advices;
  }, []);
  const parsedFile = `${parseFolder}/${mdBaseName(filename)}.json`;
  fs.writeFileSync(parsedFile, stringify(advices));
};

const createAllProjectsFile = allProjects => {
  const baseNames = allProjects.map(mdBaseName);
  const allProjectsFile = `${parseFolder}/projects.json`;
  fs.writeFileSync(allProjectsFile, stringify(baseNames));
};

const allProjects = fs.readdirSync(baseFolder);

allProjects.forEach(parseProject);
createAllProjectsFile(allProjects);
process.stdout.write('Done!');
