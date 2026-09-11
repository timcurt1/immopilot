insert into agencies(id,name,city) values ('00000000-0000-0000-0000-000000000001','Agence Démo ImmoPilot','Paris') on conflict do nothing;
insert into properties(id,agency_id,title,address,city,rent,status) values
('10000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000001','T2 — Paris 11e','12 rue de la République','Paris',1250,'active'),
('10000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-000000000001','T3 — Paris 17e','8 avenue des Ternes','Paris',1650,'active'),
('10000000-0000-0000-0000-000000000003','00000000-0000-0000-0000-000000000001','Studio — Lyon 3e','4 rue Garibaldi','Lyon',690,'active'),
('10000000-0000-0000-0000-000000000004','00000000-0000-0000-0000-000000000001','T2 — Clermont-Ferrand centre','22 rue Blatin','Clermont-Ferrand',700,'active') on conflict do nothing;
insert into applications(id,agency_id,property_id,candidate_email,first_name,last_name,phone,city,job_status,income,guarantor_status,guarantor_income,stage,activity,visit_status,score,signature_probability,score_source,note,last_message) values
('20000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001','jordan@email.com','Jordan','Taylor','06 11 22 33 44','Paris 11e','CDI',3650,'Pas nécessaire',0,'À compléter','Document manquant','À confirmer',82,82,null,'Candidat solide.','Bonjour Jordan, votre dossier est presque prêt.'),
('20000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000002','camille@email.com','Camille','Lefèvre','06 12 34 56 78','Paris 17e','CDI',4200,'Oui',3400,'Prêt à valider','Dossier complet','Confirmée',91,91,null,'Très motivée.',null),
('20000000-0000-0000-0000-000000000003','00000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000003','thomas@email.com','Thomas','Nguyen','06 33 21 44 90','Lyon 3e','Étudiant',0,'Oui',4200,'À relancer','Pas d’activité 48h','En attente',64,58,null,'Cherche pour la rentrée.',null),
('20000000-0000-0000-0000-000000000004','00000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000004','lea.moreau@email.com','Léa','Moreau','06 44 55 66 77','Clermont-Ferrand','CDI',2100,'Oui',2600,'À compléter','Document manquant','À confirmer',87,78,'ai','Demande initiale : « Bonjour, je cherche un T2 à Clermont-Ferrand, budget 700€, disponible rapidement, si possible proche des transports. Merci ! »',null) on conflict do nothing;
insert into tasks(application_id,agency_id,title,type,priority) values
('20000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000001','Demander avis d’imposition et RIB','docs','high'),
('20000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-000000000001','Valider le dossier de Camille','ready','high'),
('20000000-0000-0000-0000-000000000003','00000000-0000-0000-0000-000000000001','Relancer Thomas après 48h','reminder','medium'),
('20000000-0000-0000-0000-000000000004','00000000-0000-0000-0000-000000000001','Proposer des biens compatibles à Léa (T2 Clermont-Ferrand, 700€)','docs','high');
insert into message_templates(agency_id,title,body) values
('00000000-0000-0000-0000-000000000001','Document manquant','Bonjour, votre dossier est presque prêt. Il manque encore certains documents pour permettre à l’agence de l’étudier rapidement.'),
('00000000-0000-0000-0000-000000000001','Visite à confirmer','Bonjour, pouvez-vous confirmer votre disponibilité pour la visite du logement ?'),
('00000000-0000-0000-0000-000000000001','Dossier complet','Bonjour, votre dossier est complet. L’agence va maintenant procéder à l’étude finale.'),
('00000000-0000-0000-0000-000000000001','Relance 48h','Bonjour, votre dossier est toujours ouvert, mais il manque une action pour poursuivre.'),
('00000000-0000-0000-0000-000000000001','Demande garant','Bonjour, pouvez-vous ajouter les informations et justificatifs de votre garant ?'),
('00000000-0000-0000-0000-000000000001','Refus poli','Bonjour, merci pour votre candidature. Après étude, nous ne pourrons malheureusement pas donner suite pour ce logement.');
