class Files {
  constructor() {
    this.files = new Set();
    this.addListeners = [];
    this.removeListeners = [];
  }

  addFiles(files) {
    files.forEach((addedFile) => {
      this.files.add(addedFile);
    });
    this.notifyListeners('add', files);
  }

  removeFile(removedFile) {
    const file = this.findFile((f) => this.filesEqual(f, removedFile));
    this.files.delete(file);
    this.notifyListeners('remove', file);
  }

  addFilesChangeListener(type, listener) {
    if (typeof listener === 'function') {
      switch (type) {
        case 'add':
          this.addListeners.push(listener);
          break;
        case 'remove':
          this.removeListeners.push(listener);
          break;
        default:
          break;
      }
    }
  }

  findFile(predicate) {
    let result;
    this.files.forEach((file) => {
      if (predicate(file)) {
        result = file;
      }
    });

    return result;
  }

  clear() {
    const data = Array.from(this.files);
    this.files.clear();
    this.notifyListeners('remove', data);
  }

  static filesEqual(file1, file2) {
    return file1.id === file2.id;
  }

  notifyListeners(type, data) {
    let listeners;
    switch (type) {
      case 'add':
        listeners = this.addListeners;
        break;
      case 'remove':
        listeners = this.removeListeners;
        break;
      default:
        return;
    }
    listeners.forEach((listener) => {
      listener(Array.from(this.files.values()), data);
    });
  }
}

export default Files;
