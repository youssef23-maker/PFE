-- Politique pour chat_sessions
CREATE POLICY "Les utilisateurs peuvent voir uniquement leurs propres sessions"
ON chat_sessions
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Les utilisateurs peuvent créer leurs propres sessions"
ON chat_sessions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Les utilisateurs peuvent mettre à jour uniquement leurs propres sessions"
ON chat_sessions
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Les utilisateurs peuvent supprimer uniquement leurs propres sessions"
ON chat_sessions
FOR DELETE
USING (auth.uid() = user_id);

-- Politique pour messages
CREATE POLICY "Les utilisateurs peuvent voir uniquement les messages de leurs sessions"
ON messages
FOR SELECT
USING (
  session_id IN (
    SELECT id FROM chat_sessions WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Les utilisateurs peuvent ajouter des messages uniquement à leurs sessions"
ON messages
FOR INSERT
WITH CHECK (
  session_id IN (
    SELECT id FROM chat_sessions WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Les utilisateurs peuvent supprimer uniquement les messages de leurs sessions"
ON messages
FOR DELETE
USING (
  session_id IN (
    SELECT id FROM chat_sessions WHERE user_id = auth.uid()
  )
);