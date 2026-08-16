-- INSERT 10 CORE FOODS
INSERT INTO foods (id, name, category, description) VALUES
('f0000000-0000-0000-0000-000000000001', 'Milk', 'Dairy', 'Liquid dairy product.'),
('f0000000-0000-0000-0000-000000000002', 'Sugar', 'Sweeteners', 'Sweet crystalline substance obtained from various plants.'),
('f0000000-0000-0000-0000-000000000003', 'Turmeric', 'Spices', 'Yellow spice powder.'),
('f0000000-0000-0000-0000-000000000004', 'Chilli Powder', 'Spices', 'Red spice powder made from ground chili peppers.'),
('f0000000-0000-0000-0000-000000000005', 'Honey', 'Sweeteners', 'Sweet, viscous food substance made by honey bees.'),
('f0000000-0000-0000-0000-000000000006', 'Edible Oil', 'Oils & Fats', 'Oils suitable for human consumption.'),
('f0000000-0000-0000-0000-000000000007', 'Tea', 'Beverages', 'Aromatic beverage commonly prepared by pouring hot water over cured leaves.'),
('f0000000-0000-0000-0000-000000000008', 'Coffee', 'Beverages', 'Brewed drink prepared from roasted coffee beans.'),
('f0000000-0000-0000-0000-000000000009', 'Flour', 'Grains', 'Powder made by grinding raw grains.'),
('f0000000-0000-0000-0000-000000000010', 'Salt', 'Minerals', 'Mineral substance composed primarily of sodium chloride.')
ON CONFLICT (id) DO NOTHING;

-- INSERT ADULTERANTS
INSERT INTO adulterants (id, name, description, severity) VALUES
('a0000000-0000-0000-0000-000000000001', 'Starch', 'Added to thicken liquid.', 'MODERATE'),
('a0000000-0000-0000-0000-000000000002', 'Synthetic Sweetener', 'Used to artificially sweeten products.', 'MODERATE'),
('a0000000-0000-0000-0000-000000000003', 'Artificial Colour', 'Non-permitted synthetic food color.', 'HIGH'),
('a0000000-0000-0000-0000-000000000004', 'Added Syrup', 'Cheaper sugar syrups mixed into pure products like honey.', 'LOW'),
('a0000000-0000-0000-0000-000000000005', 'Argemone Oil', 'Toxic oil sometimes mixed with edible oils.', 'HIGH'),
('a0000000-0000-0000-0000-000000000006', 'Foreign Material', 'Dust, pebbles, or other non-food debris.', 'LOW'),
('a0000000-0000-0000-0000-000000000007', 'Metanil Yellow', 'Toxic dye used to color foods yellow.', 'HIGH')
ON CONFLICT (id) DO NOTHING;

-- CREATE DEMO USER (In an actual app this is managed by Supabase Auth, but we can insert a profile manually for references)
-- Note: It will be better to have the app create samples without enforcing auth on demo cases, or creating a generic demo user.
-- Since foreign key constraint to auth.users exists, we'll insert demo cases without a user_id or handle it in application logic.
-- Actually, the schema says: user_id UUID REFERENCES profiles(id) ON DELETE CASCADE
-- So user_id can be NULL if the foreign key allows it (it does not specify NOT NULL).

-- INSERT 10 DEMO SAMPLES
INSERT INTO samples (id, sample_id, food_id, food_name, status) VALUES
('s0000000-0000-0000-0000-000000000001', 'DEMO-MILK-001', 'f0000000-0000-0000-0000-000000000001', 'Milk', 'COMPLETED'),
('s0000000-0000-0000-0000-000000000002', 'DEMO-SUGR-002', 'f0000000-0000-0000-0000-000000000002', 'Sugar', 'COMPLETED'),
('s0000000-0000-0000-0000-000000000003', 'DEMO-TURM-003', 'f0000000-0000-0000-0000-000000000003', 'Turmeric', 'COMPLETED'),
('s0000000-0000-0000-0000-000000000004', 'DEMO-CHIL-004', 'f0000000-0000-0000-0000-000000000004', 'Chilli Powder', 'COMPLETED'),
('s0000000-0000-0000-0000-000000000005', 'DEMO-HONY-005', 'f0000000-0000-0000-0000-000000000005', 'Honey', 'COMPLETED'),
('s0000000-0000-0000-0000-000000000006', 'DEMO-OIL-006',  'f0000000-0000-0000-0000-000000000006', 'Edible Oil', 'COMPLETED'),
('s0000000-0000-0000-0000-000000000007', 'DEMO-TEA-007',  'f0000000-0000-0000-0000-000000000007', 'Tea', 'COMPLETED'),
('s0000000-0000-0000-0000-000000000008', 'DEMO-COFF-008', 'f0000000-0000-0000-0000-000000000008', 'Coffee', 'COMPLETED'),
('s0000000-0000-0000-0000-000000000009', 'DEMO-FLOR-009', 'f0000000-0000-0000-0000-000000000009', 'Flour', 'COMPLETED'),
('s0000000-0000-0000-0000-000000000010', 'DEMO-SALT-010', 'f0000000-0000-0000-0000-000000000010', 'Salt', 'COMPLETED')
ON CONFLICT (id) DO NOTHING;

-- TEST RESULTS FOR DEMOS
INSERT INTO test_results (id, sample_id, test_type, test_name, test_result, parameter) VALUES
('t0000000-0000-0000-0000-000000000001', 's0000000-0000-0000-0000-000000000001', 'QUALITATIVE', 'Starch Detection', 'Positive', 'Iodine Test'),
('t0000000-0000-0000-0000-000000000002', 's0000000-0000-0000-0000-000000000002', 'QUALITATIVE', 'Synthetic Sweetener Screening', 'Suspected', 'General'),
('t0000000-0000-0000-0000-000000000003', 's0000000-0000-0000-0000-000000000003', 'QUALITATIVE', 'Artificial Colour Detection', 'Positive', 'Metanil Yellow'),
('t0000000-0000-0000-0000-000000000004', 's0000000-0000-0000-0000-000000000004', 'QUALITATIVE', 'Synthetic Colour Detection', 'Positive', 'Rhodamine B'),
('t0000000-0000-0000-0000-000000000005', 's0000000-0000-0000-0000-000000000005', 'QUALITATIVE', 'Sugar/Syrup Screening', 'Suspected', 'Fructose Ratio'),
('t0000000-0000-0000-0000-000000000006', 's0000000-0000-0000-0000-000000000006', 'QUALITATIVE', 'Argemone Oil Screening', 'Negative', 'Nitric Acid Test'),
('t0000000-0000-0000-0000-000000000007', 's0000000-0000-0000-0000-000000000007', 'QUALITATIVE', 'Artificial Colour Screening', 'Suspected', 'Bismark Brown'),
('t0000000-0000-0000-0000-000000000008', 's0000000-0000-0000-0000-000000000008', 'QUALITATIVE', 'Foreign Material/Starch Screening', 'Negative', 'Iodine Test'),
('t0000000-0000-0000-0000-000000000009', 's0000000-0000-0000-0000-000000000009', 'QUALITATIVE', 'Foreign Material Screening', 'Suspected', 'Chalk/Talc'),
('t0000000-0000-0000-0000-000000000010', 's0000000-0000-0000-0000-000000000010', 'QUALITATIVE', 'Foreign Material Screening', 'Negative', 'Chalk')
ON CONFLICT (id) DO NOTHING;

-- ANALYSIS RESULTS FOR DEMOS
INSERT INTO analysis_results (id, sample_id, predicted_adulterant, confidence, evidence, risk_level, is_demo) VALUES
('r0000000-0000-0000-0000-000000000001', 's0000000-0000-0000-0000-000000000001', 'Starch', 0.95, 'Positive Iodine Test result.', 'MODERATE', true),
('r0000000-0000-0000-0000-000000000002', 's0000000-0000-0000-0000-000000000002', 'Synthetic Sweetener', 0.82, 'Suspected presence from general screening.', 'MODERATE', true),
('r0000000-0000-0000-0000-000000000003', 's0000000-0000-0000-0000-000000000003', 'Artificial Colour', 0.98, 'Positive detection of Metanil Yellow.', 'HIGH', true),
('r0000000-0000-0000-0000-000000000004', 's0000000-0000-0000-0000-000000000004', 'Artificial Colour', 0.96, 'Positive detection of Rhodamine B.', 'HIGH', true),
('r0000000-0000-0000-0000-000000000005', 's0000000-0000-0000-0000-000000000005', 'Added Syrup', 0.75, 'Suspected altered fructose ratio.', 'LOW', true),
('r0000000-0000-0000-0000-000000000006', 's0000000-0000-0000-0000-000000000006', 'None detected', 0.99, 'Negative Nitric Acid Test.', 'LOW', true),
('r0000000-0000-0000-0000-000000000007', 's0000000-0000-0000-0000-000000000007', 'Artificial Colour', 0.70, 'Suspected presence of Bismark Brown.', 'MODERATE', true),
('r0000000-0000-0000-0000-000000000008', 's0000000-0000-0000-0000-000000000008', 'None detected', 0.98, 'Negative Iodine Test.', 'LOW', true),
('r0000000-0000-0000-0000-000000000009', 's0000000-0000-0000-0000-000000000009', 'Foreign Material', 0.85, 'Suspected presence of Chalk/Talc.', 'LOW', true),
('r0000000-0000-0000-0000-000000000010', 's0000000-0000-0000-0000-000000000010', 'None detected', 0.99, 'Negative test for Chalk.', 'LOW', true)
ON CONFLICT (id) DO NOTHING;
