import { v4 as uuidV4 } from 'uuid';
import { fetchFileById } from './api';

function createFileNode() {
  const fileNode = document.createElement('div');
  fileNode.className = 'list__el card';
  fileNode.id = `${uuidV4()}`;

  return fileNode;
}

async function updateFileCard(fileId, fileNode, onClick) {
  const fileTop = document.createElement('div');
  fileTop.className = 'card__top';
  const fileTitle = document.createElement('div');
  fileTitle.className = 'card__title';
  const fileTime = document.createElement('div');
  fileTime.className = 'card__time';
  const fileContent = document.createElement('div');
  fileContent.className = 'card__content';

  const file = (await fetchFileById(fileId)).data;
  fileTitle.innerText = file.name.trim();
  fileTime.innerHTML = new Intl.DateTimeFormat(
    navigator.language || navigator.userLanguage,
    {
      dateStyle: 'long',
      timeStyle: 'short',
    }
  ).format(new Date(file.timestamp));
  fileContent.innerText = file.description.trim();

  fileTop.appendChild(fileTitle);
  fileTop.appendChild(fileTime);

  fileNode.appendChild(fileTop);
  fileNode.appendChild(fileContent);

  fileNode.addEventListener('click', () => {
    onClick?.call(this, file);
  });
}

function showIn(area, filesId, onClick) {
  const lists = area.getElementsByClassName('list');
  if (!lists) {
    return;
  }

  const listNode = new Map();

  lists.forEach((list) => {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
    filesId.forEach((fileId) => {
      const fileNode = createFileNode(onClick);
      list.appendChild(fileNode);
      listNode.set(fileId, fileNode);
    });
  });

  listNode.forEach((node, fileId) => {
    updateFileCard(fileId, node, onClick);
  });
}

export default showIn;
