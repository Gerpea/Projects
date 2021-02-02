/* eslint-disable require-jsdoc */
"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const CUT_OFF_TIME = 2 * 60 * 60 * 1000; // 2 Hours in milliseconds.

exports.addMessage = functions.https.onCall(async (data, context) => {
  const content = data.content;

  if (
    !(typeof content === "string") ||
    content.length === 0 ||
    content.length > 150
  ) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with one arguments" +
        "'content' with at most 150 chars.",
    );
  }

  if (!context.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called " + "while authenticated.",
    );
  }

  const writeResult = await admin
    .database()
    .ref("/messages")
    .push({
      content: content,
      timestamp: admin.database.ServerValue.TIMESTAMP,
    });

  await deleteOldMessages();
  return {result: writeResult.key};
});

exports.addComment = functions.https.onCall(async (data, context) => {
  const content = data.content;
  const messageId = data.messageId;

  if (
    !(typeof content === "string") ||
    content.length === 0 ||
    content.length > 150 ||
    !(typeof messageId === "string")
  ) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with two arguments" +
        "'content' with at most 150 chars and messageId" +
        "with id of commented message.",
    );
  }

  if (!context.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called " + "while authenticated.",
    );
  }

  const writeResult = await admin
    .database()
    .ref(`/comments/${messageId}`)
    .push({
      content: content,
      timestamp: admin.database.ServerValue.TIMESTAMP,
    });

  await deleteOld(admin.database().ref(`/comments/${messageId}`));
  return {result: writeResult.key};
});

async function deleteOldMessages() {
  const deleted = await deleteOld(admin.database().ref("/messages"));
  await admin
    .database()
    .ref("/comments")
    .update(deleted);
}

async function deleteOld(ref) {
  const now = Date.now();
  const cutoff = now - CUT_OFF_TIME;

  const oldItemsQuery = ref.orderByChild("timestamp").endAt(cutoff);
  const snapshot = await oldItemsQuery.once("value");

  const updates = {};

  snapshot.forEach((child) => {
    updates[child.key] = null;
  });

  await ref.update(updates);
  return updates;
}
