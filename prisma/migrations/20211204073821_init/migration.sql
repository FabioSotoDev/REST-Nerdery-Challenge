/*
  Warnings:

  - You are about to drop the column `publishType` on the `reports` table. All the data in the column will be lost.
  - You are about to drop the column `postCommentId` on the `user_likes` table. All the data in the column will be lost.
  - You are about to drop the column `publishType` on the `user_likes` table. All the data in the column will be lost.
  - Added the required column `publish_type` to the `reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_comment_id` to the `user_likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publish_type` to the `user_likes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reports" DROP COLUMN "publishType",
ADD COLUMN     "publish_type" "PublishType" NOT NULL;

-- AlterTable
ALTER TABLE "user_likes" DROP COLUMN "postCommentId",
DROP COLUMN "publishType",
ADD COLUMN     "post_comment_id" TEXT NOT NULL,
ADD COLUMN     "publish_type" "PublishType" NOT NULL;
