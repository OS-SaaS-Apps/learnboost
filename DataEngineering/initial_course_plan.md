Programme de mise à niveau. Data Engineering \& AI Engineering Manager
Je construirais ce cours comme une formation de transition entre Software Engineering Manager et Data Engineering Manager, et non comme une formation destinée à faire du candidat un Data Engineer opérationnel.

C'est une distinction importante. Avec cinq années de management d'équipe et une expérience de Software Engineering, le candidat maîtrise probablement déjà le développement logiciel, les architectures applicatives, les cycles de livraison, le management technique et les pratiques DevOps.

Il faut donc concentrer l'apprentissage sur trois objectifs :

Comprendre les concepts techniques : acquérir suffisamment de profondeur pour comprendre les architectures Data et AI, discuter avec des experts et challenger leurs choix.

Comprendre les enjeux opérationnels : savoir concevoir une organisation, définir des standards, arbitrer les technologies, maîtriser les coûts et garantir la qualité des plateformes.

Savoir manager une équipe Data : comprendre les spécificités des métiers, des processus, des compétences et des responsabilités d'une organisation Data.

Je propose huit grands thèmes, organisés progressivement, des fondamentaux Data jusqu'à l'IA agentique.
Vue d'ensemble du programme

1. Data Management Fundamentals
Fondamental

Comprendre la donnée comme un actif de l'entreprise.

2. Data Engineering \& Architecture

Comprendre comment construire et exploiter des plateformes de données.

3. Data Integration \& Pipelines

Maîtriser les mécanismes d'ingestion, de transformation et d'orchestration.

4. Data Storage, Modeling \& Analytics

Comprendre comment organiser, stocker et exploiter les données.

5. DataOps, Quality \& Governance

Garantir la fiabilité, la sécurité et la gouvernance des données.

6. Machine Learning \& MLOps

Comprendre le cycle de vie des modèles prédictifs.

7. Generative AI \& Agentic AI Engineering

Comprendre les LLM, RAG, agents et architectures d'IA.

8. Data \& AI Engineering Management

Savoir piloter les équipes, les plateformes, les budgets et la stratégie.

Je recommande de traiter ces thèmes dans cet ordre. Il existe des dépendances importantes entre eux. Par exemple, comprendre le Data Quality Management avant de parler de qualité des modèles ML permet de mieux comprendre les problèmes rencontrés en production.

1. Data Management Fundamentals
Priorité très élevée
Comprendre la donnée comme un actif de l'entreprise

Objectif pédagogique : comprendre le vocabulaire, les concepts et les responsabilités du Data Management. Un manager doit notamment comprendre pourquoi gérer des données est fondamentalement différent de gérer des objets métier dans une application.
Élément à connaître	Description et explication
Data Lifecycle	Cycle de vie d'une donnée : création, collecte, stockage, transformation, utilisation, archivage et suppression. Comprendre les responsabilités à chaque étape.
Data Governance	Ensemble des règles, processus et responsabilités permettant de maîtriser les données. Comprendre les rôles de Data Owner, Data Steward et Data Custodian.
Data Quality	Dimensions de qualité : accuracy, completeness, consistency, validity, uniqueness et timeliness. Comprendre pourquoi une donnée techniquement disponible n'est pas nécessairement exploitable.
Master Data Management (MDM)	Gestion des données de référence : clients, fournisseurs, produits, organisations. Comprendre la notion de Golden Record et la résolution des doublons.
Metadata Management	Gestion des informations décrivant les données : définition, origine, format, propriétaire, classification, relations et fréquence de mise à jour.
Data Lineage	Capacité à retracer l'origine d'une donnée, ses transformations et ses consommateurs. Essentiel pour l'analyse d'impact et l'audit.
Data Catalog	Référentiel central permettant de découvrir, comprendre et utiliser les données disponibles dans l'entreprise.

Exercice 1. Data Governance Case Study

Une entreprise possède trois systèmes clients : CRM, ERP et application e-commerce. Les noms, adresses et identifiants clients divergent.

Le candidat doit proposer un modèle de gouvernance : identifier le Data Owner, définir le système de référence, établir les règles de qualité et proposer un processus de résolution des conflits.

Exercice 2. Data Quality Assessment

Fournir un dataset de 10 000 clients contenant des doublons, des adresses invalides, des valeurs manquantes et des incohérences.

Le candidat doit définir des indicateurs de qualité, identifier les anomalies et proposer un plan de remédiation avec des seuils de qualité mesurables.









Outil de révision : OpenMetadata

Plateforme open source de Data Catalog, Metadata Management, Data Lineage et Data Quality. Permet d'explorer concrètement les concepts du thème.

Site officiel



2. Data Engineering \& Architecture
Priorité très élevée
Comprendre les plateformes et architectures Data

Objectif pédagogique : savoir lire, concevoir et challenger une architecture Data moderne. C'est probablement l'un des thèmes les plus importants pour un candidat issu du Software Engineering.
Élément à connaître	Description et explication
Data Architecture	Organisation globale des systèmes, flux, stockages et consommateurs de données. Comprendre les couches sources, ingestion, stockage, transformation et consommation.
Data Warehouse	Entrepôt centralisé de données structurées et préparées pour l'analyse. Comprendre les usages décisionnels, les dimensions, les faits et les schémas en étoile.
Data Lake	Stockage de grandes quantités de données dans leur format d'origine ou transformé, structurées ou non structurées. Comprendre ses avantages et les risques de Data Swamp.
Data Lakehouse	Architecture combinant la flexibilité d'un Data Lake et les fonctionnalités de gestion d'un Data Warehouse. Comprendre les tables transactionnelles, les métadonnées et les formats ouverts.
Lambda \& Kappa Architecture	Deux modèles d'architecture de traitement des données. Lambda combine traitement batch et streaming, Kappa privilégie un pipeline de streaming. Comprendre leurs compromis.
Data Mesh	Approche organisationnelle et architecturale décentralisant la responsabilité des données vers les domaines métier. Comprendre Data as a Product, Domain Ownership et Self-Service Data Platform.
Distributed Computing	Traitement distribué sur plusieurs machines. Comprendre le partitionnement, le parallélisme, la tolérance aux pannes, le shuffle et les problèmes de scalabilité.

Exercice 1. Architecture Design

Une banque doit consolider les transactions de ses applications, son CRM et son système comptable afin de fournir des analyses financières quotidiennes et des indicateurs quasi temps réel.

Le candidat doit proposer une architecture complète, comparer Data Warehouse, Data Lake et Lakehouse, définir les flux et justifier ses choix technologiques.

Exercice 2. Architecture Review

On fournit trois architectures existantes : Data Warehouse traditionnel, Data Lake centralisé et Data Mesh.

Le candidat doit identifier les forces, faiblesses, risques, coûts et contraintes opérationnelles de chacune. Il doit ensuite recommander une architecture pour une entreprise de 2 000 collaborateurs.









Outil de révision : Databricks

Environnement pour explorer le Lakehouse, Delta Lake, Spark, les architectures Medallion (Bronze, Silver, Gold) et les traitements distribués.

Site officiel



3. Data Integration \& Pipelines
Priorité très élevée
Comprendre comment les données circulent et sont transformées

Objectif pédagogique : maîtriser les concepts de construction et d'exploitation des Data Pipelines. Le candidat doit comprendre comment des données provenant de dizaines de systèmes deviennent des données exploitables.
Élément à connaître	Description et explication
ETL \& ELT	ETL : Extract, Transform, Load. ELT : Extract, Load, Transform. Comprendre les différences d'architecture, les avantages du traitement dans la plateforme cible et les implications sur les coûts.
Batch Processing	Traitement de données par lots, généralement à intervalles réguliers. Comprendre les fenêtres de traitement, les dépendances et les mécanismes de reprise.
Stream Processing	Traitement continu des événements au fil de leur arrivée. Comprendre les événements, les fenêtres temporelles, le traitement à faible latence et les événements tardifs.
Change Data Capture (CDC)	Capture des modifications effectuées dans une base de données afin de les transmettre à d'autres systèmes sans répliquer systématiquement l'ensemble des données.
Message Brokers \& Event Streaming	Systèmes de transmission d'événements entre producteurs et consommateurs. Comprendre topics, partitions, offsets, consumer groups et event ordering.
Data Orchestration	Coordination des pipelines, dépendances, planification, retries et gestion des erreurs. Distinguer orchestration, transformation et transport des données.
Idempotency \& Exactly-once Processing	Garantir qu'une opération répétée ne produit pas de résultats incorrects. Comprendre les garanties at-least-once, at-most-once et exactly-once, souvent difficiles à assurer de bout en bout.

Exercice 1. Construire un pipeline

À partir d'une API REST fournissant des transactions financières, concevoir un pipeline qui récupère les données toutes les heures, les stocke, les transforme et les rend accessibles à un outil de reporting.

Définir les stratégies de retry, de déduplication, de journalisation et de gestion des erreurs.

Exercice 2. Incident Management

Un pipeline de traitement de commandes s'arrête pendant six heures. Après redémarrage, certaines transactions sont dupliquées et d'autres manquent.

Le candidat doit identifier les causes possibles, concevoir une stratégie de récupération et définir les mécanismes empêchant la répétition de l'incident.









Outil de révision : Apache Airflow

Plateforme open source d'orchestration de workflows. Permet de créer des DAG, définir des dépendances, planifier des exécutions et observer les échecs et reprises.

Site officiel



4. Data Storage, Modeling \& Analytics
Priorité élevée
Comprendre comment structurer et exploiter les données

Objectif pédagogique : comprendre les modèles de données, les mécanismes de stockage et les enjeux de performance. Le candidat doit être capable de dialoguer avec des Data Engineers, Analytics Engineers et équipes BI.
Élément à connaître	Description et explication
Relational vs NoSQL Databases	Différences entre bases relationnelles et non relationnelles. Comprendre les modèles document, key-value, column-family et graph, ainsi que leurs cas d'utilisation.
OLTP vs OLAP	OLTP optimise les transactions opérationnelles. OLAP optimise les analyses et agrégations sur de grandes quantités de données. Comprendre pourquoi leurs architectures et leurs optimisations diffèrent.
Data Modeling	Modélisation conceptuelle, logique et physique. Comprendre les entités, relations, clés primaires, clés étrangères et contraintes d'intégrité.
Dimensional Modeling	Modélisation analytique avec tables de faits et dimensions. Comprendre Star Schema, Snowflake Schema, grain et Slowly Changing Dimensions.
Data Formats	Formats de stockage et d'échange : CSV, JSON, Avro, Parquet et ORC. Comprendre les différences entre formats row-based et column-based, ainsi que les enjeux de compression et de lecture.
Partitioning \& Indexing	Organisation physique des données pour améliorer les performances. Comprendre partitionnement, clustering, indexes et pruning.
SQL \& Query Optimization	Comprendre les jointures, agrégations, window functions, execution plans et les causes de requêtes lentes.

Exercice 1. Data Modeling

Concevoir le modèle analytique d'une entreprise de distribution avec des commandes, clients, produits, magasins et transactions.

Définir le grain de la table de faits, les dimensions, les relations et les règles de gestion des historiques clients et produits.

Exercice 2. Performance Optimization

On fournit une requête SQL qui prend 15 minutes sur une table de plusieurs centaines de millions de lignes.

Le candidat doit analyser le plan d'exécution, identifier les problèmes de jointure, de partitionnement et de lecture, puis proposer des optimisations.









Outil de révision : dbt

Permet de transformer des données avec SQL, de structurer les modèles, de gérer les dépendances et de documenter les transformations. Très utile pour comprendre l'Analytics Engineering.

Site officiel



5. DataOps, Quality \& Governance
Priorité élevée
Industrialiser et sécuriser la plateforme Data

Objectif pédagogique : comprendre comment passer de pipelines qui fonctionnent en développement à une plateforme Data fiable, sécurisée et exploitable en production.
Élément à connaître	Description et explication
DataOps	Application des principes DevOps au monde de la donnée : automatisation, collaboration, monitoring, tests et amélioration continue.
Data Observability	Surveillance de la santé des données et des pipelines : fraîcheur, volume, distribution, schéma et anomalies. Comprendre la différence entre monitoring technique et observabilité des données.
Data Testing	Tests unitaires, tests d'intégration, tests de schéma et tests de qualité des données. Comprendre comment prévenir la propagation d'erreurs dans les pipelines.
CI/CD for Data	Gestion du versionnement, tests automatisés, déploiements et rollback des pipelines, modèles SQL et configurations. Comprendre les particularités des changements de schéma et de données.
Data Security \& Privacy	Classification des données, contrôle d'accès, chiffrement, masquage, anonymisation et pseudonymisation. Comprendre les exigences RGPD et les principes de moindre privilège.
Data SLAs \& SLOs	Définition des engagements de service : disponibilité, fraîcheur, complétude et temps de traitement. Comprendre les conséquences métier d'un retard de données.
FinOps \& Cost Management	Gestion des coûts des infrastructures Data : stockage, calcul, transferts, requêtes et licences. Comprendre les coûts liés aux architectures cloud et aux traitements distribués.

Exercice 1. Production Readiness Review

Une plateforme Data fonctionne correctement en développement mais rencontre des incidents en production : données manquantes, pipelines bloqués, coûts imprévus et absence de documentation.

Le candidat doit définir un plan d'industrialisation, des contrôles qualité, des SLA/SLO, des mécanismes de monitoring et une stratégie de sécurité.

Exercice 2. Data Incident Simulation

Un dashboard financier présente des chiffres erronés depuis trois jours à cause d'un changement de schéma dans un système source.

Le candidat doit organiser la réponse à l'incident, déterminer les impacts, définir les responsabilités et proposer les actions correctives et préventives.









Outil de révision : Great Expectations

Framework open source de validation des données. Permet de définir des expectations, d'exécuter des contrôles et de documenter les résultats de validation.

Site officiel



6. Machine Learning \& MLOps
Priorité élevée
Comprendre le cycle de vie des modèles prédictifs

Objectif pédagogique : comprendre ce que fait le Machine Learning, comment les modèles sont entraînés et comment ils sont déployés et maintenus en production. Il ne s'agit pas de former un Data Scientist, mais de donner au manager les moyens de piloter une équipe ML.
Élément à connaître	Description et explication
Supervised \& Unsupervised Learning	Apprentissage supervisé à partir de données étiquetées et apprentissage non supervisé pour découvrir des structures. Comprendre classification, régression et clustering.
ML Algorithms	Comprendre les grandes familles d'algorithmes : Linear Regression, Decision Trees, Random Forest, Gradient Boosting, SVM et Neural Networks. Connaître leurs usages et compromis.
Training, Validation \& Testing	Séparation des données pour entraîner, ajuster et évaluer un modèle. Comprendre overfitting, underfitting, cross-validation et data leakage.
Feature Engineering	Transformation des données brutes en variables exploitables par les modèles. Comprendre feature selection, feature extraction, normalisation et feature stores.
Model Evaluation	Évaluation des performances avec des métriques adaptées : Accuracy, Precision, Recall, F1-score, ROC-AUC, MAE et RMSE. Comprendre pourquoi l'accuracy peut être trompeuse.
Model Deployment	Mise à disposition des modèles via API, batch inference ou streaming inference. Comprendre les exigences de latence, disponibilité et scalabilité.
MLOps \& Model Monitoring	Automatisation du cycle de vie ML : expérimentation, versionnement, entraînement, déploiement et monitoring. Comprendre model drift, data drift et retraining.

Exercice 1. ML Use Case Assessment

Une compagnie d'assurance souhaite prédire les clients susceptibles de résilier leur contrat.

Le candidat doit définir le problème, identifier les données nécessaires, choisir les métriques d'évaluation, proposer une architecture ML et déterminer les risques liés à la qualité des données.

Exercice 2. Model Lifecycle

On fournit un modèle de détection de fraude qui fonctionne correctement au départ mais dont les performances diminuent progressivement.

Le candidat doit identifier les causes possibles, distinguer data drift et concept drift, concevoir une stratégie de monitoring et proposer une politique de réentraînement.









Outil de révision : MLflow

Plateforme open source pour gérer les expérimentations, les métriques, les versions de modèles et leur cycle de vie. Très pertinente pour comprendre MLOps.

Site officiel



7. Generative AI \& Agentic AI Engineering
Priorité stratégique
Comprendre les nouvelles architectures d'IA

Objectif pédagogique : acquérir une compréhension technique solide des LLM et des systèmes agentiques. Le candidat doit savoir différencier une application utilisant une API LLM, un système RAG et une véritable architecture multi-agents.
Élément à connaître	Description et explication
LLM Fundamentals	Fonctionnement général des Large Language Models : Transformers, tokens, embeddings, context window, attention et inference. Comprendre les notions de pre-training, fine-tuning et instruction tuning.
Prompt Engineering	Construction des instructions, contexte, contraintes et formats de sortie. Comprendre few-shot prompting, structured outputs, system prompts et limites du prompt engineering.
RAG (Retrieval-Augmented Generation)	Architecture qui enrichit les prompts avec des informations récupérées dans des sources externes. Comprendre ingestion, chunking, embeddings, vector search, retrieval et generation.
Vector Databases \& Semantic Search	Stockage et recherche de représentations vectorielles. Comprendre similarity search, cosine similarity, hybrid search, metadata filtering et reranking.
Fine-tuning \& Model Adaptation	Adaptation d'un modèle à un domaine ou à une tâche. Comprendre les différences entre prompt engineering, RAG, fine-tuning et techniques comme LoRA/QLoRA.
AI Agents \& Agentic Workflows	Systèmes dans lesquels un LLM peut planifier, utiliser des outils, exécuter des actions et adapter son comportement en fonction des résultats. Comprendre tool calling, planning, state management, memory et orchestration.
Multi-Agent Systems	Architecture dans laquelle plusieurs agents collaborent avec des responsabilités différentes. Comprendre les mécanismes de coordination, communication, délégation et gestion des conflits.
AI Evaluation \& Guardrails	Évaluation des réponses et des comportements : factualité, pertinence, hallucinations, robustesse, sécurité et respect des politiques. Comprendre les tests automatisés et les évaluations humaines.

Exercice 1. RAG Architecture Design

Une entreprise souhaite créer un assistant interne capable de répondre aux questions des collaborateurs à partir de 50 000 documents confidentiels.

Le candidat doit concevoir l'architecture d'ingestion, le découpage des documents, les embeddings, la recherche, le reranking, la génération et la gestion des droits d'accès.

Il doit également définir une stratégie d'évaluation de la qualité des réponses.

Exercice 2. Agentic AI Design

Une entreprise souhaite automatiser le traitement de demandes de support informatique.

Un agent doit comprendre la demande, consulter la documentation, interroger un système de tickets, proposer une solution et éventuellement exécuter une action.

Le candidat doit définir les outils accessibles, les limites d'autonomie, les validations humaines, les mécanismes de sécurité et les indicateurs de performance.









Outil de révision : LangGraph

Framework permettant de construire des workflows agentiques avec état, cycles, branches conditionnelles, checkpoints et intervention humaine. Particulièrement intéressant pour comprendre les agents au-delà des simples prompts.

Site officiel



8. Data \& AI Engineering Management
Priorité très élevée pour le poste
Passer de la maîtrise technique au pilotage d'une organisation

Objectif pédagogique : permettre au candidat de démontrer qu'il peut prendre la responsabilité d'une équipe Data Engineering, piloter une plateforme et contribuer à la stratégie Data de l'entreprise.
Élément à connaître	Description et explication
Data Team Organization	Organisation des équipes : Data Engineers, Analytics Engineers, Data Architects, Data Scientists, ML Engineers, Data Analysts et Platform Engineers. Comprendre les responsabilités et les interactions entre ces profils.
Data Product Management	Gestion des données comme des produits : utilisateurs, besoins, contrats, documentation, qualité, disponibilité et évolution. Comprendre la notion de Data Product.
Platform Engineering	Construction de plateformes en libre-service pour les équipes Data : templates, environnements, composants réutilisables, automatisation et Developer Experience.
Technology Strategy \& Architecture Governance	Définition des standards, principes d'architecture, choix technologiques et trajectoires d'évolution. Comprendre comment éviter la multiplication des outils et des plateformes.
Build vs Buy \& Vendor Management	Évaluation des solutions internes, open source et commerciales. Comprendre le TCO, le lock-in, les compétences nécessaires, les SLA et la dépendance fournisseur.
Capacity \& Financial Management	Gestion de la capacité des équipes, priorisation, budgets, coûts cloud et allocation des ressources. Savoir arbitrer entre innovation, maintenance et dette technique.
Stakeholder \& Business Management	Collaboration avec les métiers, Product Owners, C-level et équipes IT. Savoir traduire les besoins métier en capacités Data et démontrer la valeur créée.
Team Development \& Technical Leadership	Recrutement, développement des compétences, coaching, délégation, communautés techniques et gestion des carrières dans des équipes pluridisciplinaires.

Exercice 1. Build a Data Engineering Organization

Une entreprise de 1 500 personnes souhaite créer une organisation Data Engineering de 15 collaborateurs.

Le candidat doit proposer un organigramme, définir les rôles, les responsabilités, les interfaces avec les équipes IT et métier, les compétences à recruter et les premières priorités sur douze mois.

Exercice 2. Data Platform Strategy \& Budget

Une entreprise dispose de plusieurs plateformes Data indépendantes, de coûts cloud croissants et d'une multiplication des outils.

Le candidat doit proposer une stratégie cible, définir les critères de rationalisation, comparer deux architectures, établir un budget prévisionnel et proposer une roadmap sur trois ans.









Outil de révision : Atlan

Plateforme de Data Governance et Data Catalog orientée collaboration. Permet d'explorer les responsabilités, les Data Products, le lineage et les workflows de gouvernance.

Site officiel



9. Comment organiser la formation
Je recommande de ne pas faire une formation purement théorique. Le candidat doit être capable de réutiliser les connaissances dans une discussion d'architecture, une revue de projet ou un entretien de recrutement.

Voici une proposition de progression sur six semaines.
Semaine	Thèmes	Résultat attendu
1	Data Management + Architecture	Comprendre les concepts et savoir lire une architecture Data
2	Data Integration + Pipelines	Comprendre les flux et les mécanismes de traitement
3	Storage + Modeling + Analytics	Savoir discuter de modélisation et de performance
4	DataOps + Governance	Savoir garantir la qualité et l'exploitation
5	ML + MLOps + Generative AI	Comprendre les architectures d'IA modernes
6	Agentic AI + Engineering Management	Savoir piloter une organisation Data \& AI

Méthode pédagogique recommandée
Pour chaque thème, je suivrais quatre étapes.

Comprendre. Étudier les concepts et le vocabulaire. Être capable d'expliquer chaque notion avec ses propres mots.

Explorer. Utiliser l'outil proposé pour manipuler concrètement les concepts. Il n'est pas nécessaire de devenir expert de chaque outil.

Appliquer. Réaliser les deux exercices proposés, en privilégiant la conception et les arbitrages techniques plutôt que le développement de code.

Défendre. Présenter et justifier les choix comme lors d'un entretien avec un CTO ou un Chief Data Officer.
10 questions auxquelles le candidat devrait savoir répondre en entretien
Ces questions constituent un bon test final de la formation.
Question	Compétence évaluée
Quelle est la différence entre un Data Lake, un Data Warehouse et un Lakehouse ?	Architecture
Dans quels cas choisir ETL plutôt que ELT ?	Data Engineering
Comment garantir la qualité des données dans une plateforme distribuée ?	Data Quality
Comment gérer des données provenant de systèmes hétérogènes ?	Integration
Comment concevoir un pipeline résilient et scalable ?	Engineering
Quelle différence entre Data Mesh et une plateforme Data centralisée ?	Architecture \& Organization
Quelles sont les principales difficultés pour mettre du ML en production ?	MLOps
Quand utiliser RAG, fine-tuning ou un agent ?	AI Engineering
Comment organiser une équipe de Data Engineers et définir ses responsabilités ?	Management
Comment mesurer la valeur et le ROI d'une plateforme Data ?	Business \& Strategy





Réponses aux 10 questions d'entretien. Data Engineering Manager

Voici des réponses types que le candidat devrait être capable de donner face à un CTO ou un Chief Data Officer.



Je privilégie des réponses de niveau Engineering Manager, suffisamment techniques pour démontrer une compréhension réelle des sujets, mais sans tomber dans des explications de développeur spécialisé.

1\. Quelle est la différence entre un Data Lake, un Data Warehouse et un Lakehouse ?

Réponse attendue :



Ce sont trois approches d'architecture permettant de stocker et d'exploiter des données, mais elles répondent à des besoins différents.



Data Warehouse



Un Data Warehouse est une plateforme centralisée destinée principalement à l'analyse de données structurées.



Les données sont généralement nettoyées, transformées et organisées selon un modèle défini avant leur exploitation.



Exemple : une entreprise consolide ses ventes, ses clients et ses produits dans un entrepôt pour alimenter ses rapports financiers et ses tableaux de bord.



Avantages : qualité structurée, performances analytiques, gouvernance et cohérence des indicateurs.



Limites : moins flexible pour les données non structurées et les traitements très variés.



Data Lake



Un Data Lake permet de stocker des données dans leur format d'origine ou transformé, qu'elles soient structurées, semi-structurées ou non structurées.



Les transformations peuvent être réalisées ultérieurement, au moment de l'exploitation.



Exemple : une entreprise stocke les événements applicatifs, les fichiers CSV, les logs, les documents et les données issues de ses applications.



Avantages : flexibilité, diversité des formats, séparation du stockage et du calcul.



Limites : risque de Data Swamp, difficulté de gouvernance et complexité de découverte des données.



Data Lakehouse



Le Lakehouse cherche à combiner les avantages des deux approches. Il conserve la flexibilité du Data Lake tout en apportant des fonctionnalités de gestion transactionnelle, de contrôle des schémas, de versionnement et d'optimisation des données.



Des technologies comme Delta Lake, Apache Iceberg et Apache Hudi permettent cette approche.



Positionnement managérial :



Je ne choisirais pas une architecture par effet de mode. Le choix dépend des besoins analytiques, des volumes, des types de données, des contraintes de gouvernance, des compétences disponibles et du coût total de possession.



Il est également possible de conserver un Data Warehouse existant et de lui adjoindre un Data Lakehouse pour certains usages.

2\. Dans quels cas choisir ETL plutôt que ELT ?

Réponse attendue :



ETL et ELT désignent deux stratégies d'intégration et de transformation des données.



ETL signifie Extract, Transform, Load. Les données sont extraites, transformées dans un système intermédiaire puis chargées dans la plateforme cible.



ELT signifie Extract, Load, Transform. Les données sont d'abord chargées dans la plateforme cible, puis transformées directement dans celle-ci.



ETL est particulièrement intéressant lorsque :



Les données doivent être nettoyées ou masquées avant leur arrivée dans la plateforme cible.



Les systèmes sources sont complexes et nécessitent des transformations spécifiques.



La plateforme cible possède des capacités de transformation limitées.



Il existe des contraintes réglementaires ou de sécurité qui imposent de contrôler les données avant leur chargement.



ELT est particulièrement intéressant lorsque :



La plateforme cible dispose de capacités importantes de calcul.



Les données doivent être conservées dans leur état initial pour permettre de nouvelles analyses.



Les équipes souhaitent utiliser SQL et des outils comme dbt pour gérer les transformations.



La scalabilité et la séparation entre ingestion et transformation sont importantes.



Exemple :



Pour intégrer des transactions bancaires dans un environnement analytique, je pourrais privilégier ELT pour conserver les données sources et effectuer les transformations dans le Lakehouse.



En revanche, si certaines informations personnelles doivent être masquées avant leur stockage dans un environnement partagé, un traitement ETL en amont peut être nécessaire.



Positionnement managérial :



Je privilégierais une architecture simple et cohérente, avec des règles explicites concernant les transformations, la sécurité et la traçabilité. ETL et ELT peuvent parfaitement coexister.

3\. Comment garantir la qualité des données dans une plateforme distribuée ?

Réponse attendue :



La qualité des données ne peut pas être garantie uniquement par un contrôle effectué à la fin d'un pipeline. Elle doit être intégrée à l'ensemble du cycle de vie des données.



Je structurerais cette démarche autour de cinq dimensions.



Définir les règles de qualité. Chaque Data Product doit avoir des règles adaptées à son usage : complétude, exactitude, unicité, cohérence et fraîcheur.



Contrôler les données à plusieurs niveaux. Vérifier les données à l'ingestion, après transformation et avant leur consommation. Les tests doivent couvrir les schémas, les valeurs, les relations et les règles métier.



Automatiser les contrôles. Intégrer les tests dans les pipelines et les processus CI/CD. Un pipeline ne doit pas nécessairement être bloqué pour chaque anomalie, mais les anomalies critiques doivent déclencher des mécanismes adaptés.



Surveiller la qualité en production. Mettre en place de l'observabilité pour détecter les changements de volume, de distribution, de fraîcheur ou de structure.



Attribuer les responsabilités. Le Data Owner définit les règles métier et les seuils acceptables. Le Data Engineering Manager garantit leur implémentation technique et leur surveillance.



Exemple :



Un système de reporting financier consomme des données de transactions. Si le nombre de transactions chute brutalement de 40 %, le système doit détecter l'anomalie, alerter les responsables et éviter de publier des indicateurs potentiellement incorrects.



Positionnement managérial :



Je considère la qualité des données comme une responsabilité partagée entre IT et métier. Il faut mesurer la qualité, identifier les responsables et suivre les incidents comme on suit les incidents applicatifs.

4\. Comment gérer des données provenant de systèmes hétérogènes ?

Réponse attendue :



Dans une entreprise, les données proviennent généralement de systèmes très différents : ERP, CRM, applications métier, bases relationnelles, APIs, fichiers, événements et plateformes externes.



Le principal défi n'est pas simplement de transporter les données. C'est de garantir leur cohérence sémantique, leur qualité et leur traçabilité.



Je mettrais en place une approche en cinq étapes.



1\. Identifier les sources et leurs responsabilités. Documenter les systèmes sources, leurs propriétaires, les données disponibles, les formats et les fréquences de mise à jour.



2\. Définir des contrats de données (Data Contracts). Formaliser les schémas, les types, les règles de qualité, les attentes de disponibilité et les responsabilités entre producteurs et consommateurs.



3\. Standardiser l'ingestion. Utiliser des connecteurs, des APIs, du CDC ou des mécanismes de streaming selon les caractéristiques des sources.



4\. Harmoniser les données. Normaliser les formats, les identifiants, les unités, les dates et les référentiels métier. Par exemple, un client peut avoir trois identifiants différents dans trois applications.



5\. Assurer la traçabilité. Conserver les informations sur l'origine, les transformations et les consommateurs des données.



Exemple :



Un groupe international possède trois ERP dans différents pays. Chacun représente les clients et les produits différemment.



Je mettrais en place un modèle de données commun, des règles de correspondance et une gestion des identifiants de référence. Je conserverais également les identifiants sources pour permettre de remonter aux systèmes d'origine.



Positionnement managérial :



Je chercherais à éviter les intégrations spécifiques entre chaque paire de systèmes. Une architecture d'intégration standardisée et des contrats de données permettent de réduire la complexité et les coûts de maintenance.

5\. Comment concevoir un pipeline résilient et scalable ?

Réponse attendue :



Un pipeline Data doit être conçu pour fonctionner de manière fiable même lorsque les systèmes sources, les infrastructures ou les données rencontrent des problèmes.



Je m'appuierais sur plusieurs principes.



Idempotence. Une même opération peut être exécutée plusieurs fois sans créer de résultats incorrects ou de doublons.



Gestion des erreurs et des retries. Les erreurs temporaires doivent pouvoir être traitées automatiquement. Les erreurs permanentes doivent être isolées et remontées.



Checkpointing. Conserver la progression du traitement pour pouvoir reprendre sans recommencer inutilement depuis le début.



Partitionnement et parallélisme. Diviser les traitements en unités indépendantes afin d'améliorer la capacité de traitement.



Découplage. Séparer les producteurs, les mécanismes d'ingestion, les transformations et les consommateurs. Des mécanismes comme Kafka permettent notamment de découpler les flux événementiels.



Monitoring et alerting. Mesurer les temps d'exécution, les volumes traités, les erreurs, les retards et la consommation des ressources.



Exemple :



Un pipeline traite quotidiennement 100 millions de transactions. Une panne survient après le traitement de 70 millions de lignes.



Le système doit être capable de reprendre à partir du dernier checkpoint, sans retraiter incorrectement les 70 millions de transactions déjà traitées.



Positionnement managérial :



Je définirais des objectifs de fiabilité et de performance, notamment des SLO, et je demanderais aux équipes de tester les scénarios de panne, pas seulement les scénarios nominaux.



Je veillerais également à ne pas surdimensionner les architectures. La résilience doit être proportionnée à la criticité métier.

6\. Quelle différence entre Data Mesh et une plateforme Data centralisée ?

Réponse attendue :



Une plateforme Data centralisée repose sur une équipe centrale qui collecte, transforme, gouverne et distribue les données pour l'ensemble de l'entreprise.



Le Data Mesh propose une approche différente : les domaines métier deviennent responsables de leurs propres Data Products, avec des standards et des mécanismes de gouvernance communs.



Il repose sur quatre principes fondamentaux.



Domain Ownership. Les domaines métier prennent la responsabilité de leurs données.



Data as a Product. Les données sont traitées comme des produits avec des utilisateurs, des contrats, une documentation et des engagements de qualité.



Self-Service Data Platform. Une plateforme commune fournit les capacités techniques nécessaires aux domaines.



Federated Computational Governance. La gouvernance est fédérée, avec des règles communes automatisées et des responsabilités distribuées.



Exemple :



Dans une banque, le domaine Payments est responsable de ses données de transactions, tandis que le domaine Customer est responsable de ses données clients.



Une équipe centrale fournit les standards, les outils de gouvernance, les mécanismes de sécurité et l'infrastructure commune.



Comparaison :

Critère	Centralisé	Data Mesh

Responsabilité	Équipe centrale	Domaines métier

Gouvernance	Centralisée	Fédérée

Expertise métier	Parfois éloignée des sources	Proche des domaines

Standards	Définis centralement	Communs et appliqués par les domaines

Complexité organisationnelle	Plus faible au départ	Plus élevée

Scalabilité organisationnelle	Peut devenir un goulot d'étranglement	Peut mieux évoluer avec la maturité des domaines



Positionnement managérial :



Je ne considérerais pas Data Mesh comme une architecture technologique à installer, mais comme une transformation organisationnelle.



Elle nécessite une certaine maturité métier, des équipes autonomes et une plateforme self-service efficace.



Je commencerais généralement par une organisation centralisée ou hybride, avant de décentraliser certaines responsabilités lorsque les conditions sont réunies.

7\. Quelles sont les principales difficultés pour mettre du ML en production ?

Réponse attendue :



Construire un modèle de Machine Learning performant en laboratoire est une chose. Le maintenir fiable, utile et économiquement viable en production en est une autre.



Les difficultés se répartissent en plusieurs catégories.



Data Quality. Les données de production peuvent être différentes ou moins propres que les données utilisées pendant l'entraînement.



Data Leakage. Certaines informations utilisées pour entraîner le modèle peuvent involontairement révéler le résultat attendu. Cela produit des performances artificiellement élevées.



Model Drift. Les relations statistiques apprises par le modèle peuvent évoluer avec le temps.



Deployment \& Scalability. Un modèle doit être intégré dans les applications ou les pipelines, avec des contraintes de latence, de disponibilité et de capacité.



Reproducibility. Il faut pouvoir retrouver les données, les paramètres, le code et la version du modèle utilisés lors d'un entraînement.



Monitoring. Il faut suivre non seulement la disponibilité technique, mais aussi les performances prédictives et leur évolution.



Governance. Il faut maîtriser les biais, l'explicabilité, les droits d'utilisation des données et la traçabilité des décisions.



Exemple :



Une compagnie d'assurance utilise un modèle pour évaluer le risque de fraude. Après deux ans, les comportements frauduleux évoluent et le modèle détecte moins efficacement les nouvelles méthodes.



Il faut surveiller les performances, identifier les changements dans les données, réentraîner le modèle et valider les nouvelles versions avant leur déploiement.



Positionnement managérial :



Je mettrais en place un processus MLOps industrialisé, avec versionnement des modèles, validation avant déploiement, monitoring et possibilité de rollback.



Je distinguerais également les responsabilités des Data Scientists, ML Engineers et Data Engineers. La qualité du modèle ne dépend pas uniquement de l'algorithme, mais aussi de toute l'infrastructure qui l'entoure.

8\. Quand utiliser RAG, fine-tuning ou un agent ?

Réponse attendue :



Ces trois approches répondent à des besoins différents et ne sont pas nécessairement concurrentes.



RAG (Retrieval-Augmented Generation)



Le RAG permet à un LLM d'accéder à des connaissances externes au moment de la génération.



Il est particulièrement adapté lorsque les informations évoluent régulièrement, sont privées ou proviennent de documents internes.



Exemple : un assistant qui répond aux questions des collaborateurs à partir de la documentation interne de l'entreprise.



Son avantage est qu'il permet de mettre à jour les connaissances sans réentraîner le modèle.



Ses limites concernent notamment la qualité de la recherche, le découpage des documents, le contexte récupéré et la qualité des réponses.



Fine-tuning



Le fine-tuning consiste à adapter les paramètres d'un modèle à partir d'exemples supplémentaires.



Il est particulièrement intéressant pour améliorer un comportement, un style, un format de réponse ou certaines capacités spécialisées.



Exemple : un modèle adapté à la classification de documents financiers selon une nomenclature métier spécifique.



Il n'est généralement pas le meilleur moyen de maintenir une base de connaissances régulièrement mise à jour.



AI Agent



Un agent utilise un modèle pour décider des étapes à réaliser et éventuellement appeler des outils externes.



Il peut consulter une API, interroger une base de données, créer un ticket ou déclencher une action.



Exemple : un agent de support informatique qui analyse une demande, consulte la documentation, vérifie les incidents connus et crée un ticket si nécessaire.



Comparaison :

Besoin	Approche recommandée

Interroger une documentation interne	RAG

Exploiter des connaissances régulièrement mises à jour	RAG

Adapter le comportement ou le format d'un modèle	Fine-tuning

Automatiser une tâche impliquant plusieurs étapes	Agent

Interagir avec des systèmes externes	Agent

Combiner connaissances internes et actions	RAG + Agent



Il est également possible de combiner les trois : un agent utilise un modèle fine-tuné et consulte une base documentaire via RAG.



Positionnement managérial :



Je partirais toujours du besoin métier et de la complexité réelle du problème. Je privilégierais une solution simple avant de construire une architecture agentique complexe.



Un workflow déterministe classique peut parfois être plus fiable, moins coûteux et plus facile à maintenir qu'un agent autonome.



9\. Comment organiser une équipe de Data Engineers et définir ses responsabilités ?

Réponse attendue :



L'organisation dépend de la taille de l'entreprise, de sa maturité Data, du nombre de domaines métier et de la complexité de sa plateforme.



Je distinguerais plusieurs profils complémentaires.

Rôle	Responsabilités principales

Data Engineer	Développer et maintenir les pipelines d'ingestion et de transformation.

Analytics Engineer	Construire les modèles de données analytiques et les rendre exploitables par les métiers.

Data Architect	Définir les architectures, les standards et les principes de conception.

Data Platform Engineer	Construire et exploiter l'infrastructure et les services communs de la plateforme Data.

Data Scientist	Développer les modèles statistiques et de Machine Learning.

ML Engineer	Industrialiser, déployer et maintenir les modèles ML.

Data Analyst	Analyser les données et produire des indicateurs et analyses métier.

Data Product Owner	Définir les besoins, la valeur et les priorités des Data Products.



Tous ces rôles ne nécessitent pas forcément des personnes différentes. Dans une petite équipe, plusieurs responsabilités peuvent être regroupées.



Organisation proposée pour une équipe de 12 personnes :

Data Engineering Manager



Strategy, People, Budget, Delivery, Stakeholders





Data Platform Team



4 personnes



1 Tech Lead



3 Data / Platform Engineers



Data Products Team



5 personnes



1 Tech Lead



2 Data Engineers



2 Analytics Engineers



Data Architecture \& Quality



2 personnes



1 Data Architect



1 Data Quality / Governance Specialist





Total : 12 personnes, manager compris.



Cette organisation est illustrative. Elle doit être adaptée aux responsabilités réellement confiées à l'équipe. Par exemple, si le ML Engineering relève du Data Engineering Manager, il faudra prévoir cette compétence dans l'organisation.



Principes de management :



Je privilégierais des équipes autonomes avec des responsabilités clairement définies, plutôt qu'une organisation dans laquelle chaque développeur travaille sur des demandes ponctuelles.



Je mettrais également en place des standards communs, des revues d'architecture, du partage de connaissances et des mécanismes de collaboration avec les équipes applicatives et métier.



Positionnement managérial :



Mon objectif serait de trouver un équilibre entre autonomie des équipes, cohérence technique et capacité de livraison.



Je ne chercherais pas à centraliser toutes les décisions techniques chez le manager. Les décisions doivent être prises au niveau le plus pertinent, avec un cadre architectural partagé.

10\. Comment mesurer la valeur et le ROI d'une plateforme Data ?

Réponse attendue :



Une plateforme Data ne doit pas être considérée uniquement comme une infrastructure technique. C'est un investissement qui doit produire une valeur mesurable pour l'entreprise.



Je distinguerais quatre catégories d'indicateurs.



1\. Business Value



Mesurer la valeur directement créée pour les métiers.



Exemples : réduction du temps de production des rapports financiers, amélioration de la détection de fraude, réduction des erreurs de facturation, accélération des décisions commerciales.



2\. Operational Efficiency



Mesurer les gains d'efficacité opérationnelle.



Exemples : réduction du temps de traitement des pipelines, diminution des interventions manuelles, réduction des incidents, amélioration de la disponibilité des données.



3\. Data Quality \& Adoption



Mesurer la qualité et l'utilisation effective des données.



Exemples : pourcentage de Data Products respectant leurs SLA, nombre d'utilisateurs actifs, taux de réutilisation des données, diminution des anomalies.



4\. Financial Performance



Mesurer les coûts et les bénéfices économiques.



Exemples : coût par pipeline, coût par million de transactions traitées, coût de stockage, coût des requêtes, coûts des licences et dépenses cloud.



Exemple concret :



Une entreprise investit 500 000 CHF dans une nouvelle plateforme Data.



Elle estime les gains annuels suivants :

Source de valeur	Gain annuel

Automatisation des reportings	150 000 CHF

Réduction des erreurs opérationnelles	100 000 CHF

Réduction des coûts d'infrastructure	80 000 CHF

Accélération des processus décisionnels	70 000 CHF

Total	400 000 CHF



En supposant que les 500 000 CHF représentent l'investissement initial et que les 400 000 CHF constituent des bénéfices nets annuels :

\\\[

ROI\_{1an} = \\frac{400\\,000-500\\,000}{500\\,000}

= -20\\%

\\]



Le ROI devient positif sur la durée. En supposant des bénéfices constants et aucun autre coût, le retour sur investissement intervient après 15 mois.



Il faut toutefois intégrer les coûts récurrents, la maintenance, les ressources humaines et les éventuels coûts de migration pour obtenir un véritable business case.



Positionnement managérial :



Je définirais les bénéfices attendus avant de lancer les investissements et j'associerais chaque initiative à des indicateurs mesurables.



Je suivrais régulièrement les coûts, la valeur produite et l'adoption par les métiers. Une plateforme techniquement performante mais peu utilisée ne constitue pas un succès.



Bonus : le cas pratique des 90 premiers jours

C'est probablement la question la plus intéressante pour un recrutement de Data Engineering Manager.



Question :



« Vous prenez la responsabilité d'une équipe Data Engineering de 12 personnes dans une entreprise de 2 000 collaborateurs. La plateforme actuelle est vieillissante, les métiers se plaignent de la qualité des données et la direction souhaite accélérer les initiatives AI. Que faites-vous pendant vos 90 premiers jours ? »



Réponse attendue :



Je structurerais mes 90 premiers jours autour de trois phases : comprendre, stabiliser et définir la trajectoire.

Jours 1 à 30. Comprendre

Assessment



30 jours

Mon premier objectif serait de comprendre l'organisation, les équipes, la plateforme existante et les attentes du management.



Concrètement, je rencontrerais les membres de l'équipe, les responsables IT, les principaux stakeholders métier et les responsables des initiatives AI.



Je réaliserais un assessment portant sur l'architecture, les pipelines, les technologies, les coûts, la qualité des données, la sécurité et les processus opérationnels.



Je chercherais également à identifier les problèmes les plus critiques et les dépendances avec les autres équipes.



Livrables : état des lieux, cartographie des risques, première évaluation des compétences et identification des quick wins.





Jours 31 à 60. Stabiliser

Stabilization



30 jours

Sur la base de l'assessment, je définirais les premières priorités et lancerais les actions les plus importantes.



Je chercherais notamment à améliorer la fiabilité des pipelines critiques, à traiter les problèmes majeurs de qualité des données et à clarifier les responsabilités entre IT et métiers.



Je mettrais en place des indicateurs de suivi, des mécanismes de monitoring et une première gouvernance des changements.



En parallèle, je travaillerais avec les équipes AI pour identifier les prérequis Data nécessaires à leurs projets.



Livrables : plan d'amélioration opérationnelle, premiers indicateurs, backlog priorisé et clarification des responsabilités.





Jours 61 à 90. Définir la trajectoire

Strategy



30 jours

Je présenterais une vision cible de la plateforme Data et de son organisation.



Cette vision inclurait les choix architecturaux, les principes de gouvernance, les besoins en compétences, les investissements nécessaires et une roadmap sur 12 à 18 mois.



Je définirais également les indicateurs de succès, les priorités de recrutement et les modalités de collaboration avec les métiers.



Je veillerais à ce que les initiatives AI ne se développent pas sur une plateforme Data fragile ou insuffisamment gouvernée.



Livrables : stratégie Data Engineering, architecture cible, roadmap, budget prévisionnel et plan de développement de l'équipe.





Les indicateurs que je suivrais

Dimension	KPI

Reliability	Pipeline success rate

Performance	Data processing latency

Quality	Data quality pass rate

Freshness	Data freshness SLA

Operations	Mean Time to Recovery (MTTR)

Adoption	Active Data Product consumers

Financial	Platform cost / Data Product

Delivery	Lead time for Data Products

People	Skills coverage and team development



Ce que le recruteur cherche réellement à entendre

Une bonne réponse ne consiste pas à annoncer immédiatement une migration vers Databricks, Snowflake ou une architecture Data Mesh.



Le recruteur veut vérifier que le candidat sait :



Comprendre avant de décider.



Distinguer les problèmes techniques des problèmes organisationnels.



Établir des priorités en fonction de la valeur métier et des risques.



Faire progresser une équipe sans bouleverser inutilement son fonctionnement.



Construire une trajectoire technique réaliste et financièrement défendable.



Et surtout, ne pas lancer des initiatives AI simplement parce que la direction en demande.



Évaluation finale du candidat

Je proposerais de noter chaque réponse sur quatre dimensions :

Dimension	Ce qu'on cherche à évaluer

Technical understanding	Compréhension réelle des concepts

Architectural thinking	Capacité à comparer et justifier des solutions

Operational thinking	Capacité à gérer la production et les risques

Management \& Business	Capacité à organiser, prioriser et créer de la valeur



Barème proposé

Insuffisant



0 à 1 / 4



Connaissances théoriques



2 / 4



Autonome dans les discussions techniques



3 / 4



Capable de piloter et challenger



4 / 4





Mon conseil pédagogique : le candidat ne doit pas apprendre ces réponses par cœur. Il doit être capable de les reformuler, de donner des exemples concrets, de reconnaître les limites de ses connaissances et surtout de défendre ses arbitrages.



C'est ce qui fera la différence entre un Software Engineering Manager qui connaît quelques concepts Data et un véritable Data Engineering Manager.

