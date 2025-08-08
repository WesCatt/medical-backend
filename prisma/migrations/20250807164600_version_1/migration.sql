-- CreateTable
CREATE TABLE `Data` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `session_order_id` VARCHAR(191) NOT NULL,
    `round_in_session` INTEGER NOT NULL,
    `user_message` VARCHAR(191) NOT NULL,
    `agent_message` VARCHAR(191) NOT NULL,
    `doctor_message` VARCHAR(191) NOT NULL,
    `consultation_status` INTEGER NOT NULL,
    `disease_predictions` JSON NOT NULL,
    `consultation_elements` JSON NOT NULL,
    `rag_retrieval` JSON NOT NULL,
    `end_tag` BOOLEAN NOT NULL,
    `status_code` INTEGER NOT NULL,
    `error_msg` VARCHAR(191) NULL,

    UNIQUE INDEX `Data_session_order_id_round_in_session_key`(`session_order_id`, `round_in_session`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
